import { http, HttpResponse, delay } from 'msw';
import { mockAutomations } from './mockData';
import { WorkflowGraph, SimulationResult, SimulationStep } from '@/types/workflow';

export const handlers = [
  // GET /api/automations - Returns list of available automated actions
  http.get('/api/automations', async () => {
    await delay(300); // Simulate network delay
    return HttpResponse.json(mockAutomations);
  }),

  // POST /api/simulate - Simulates workflow execution
  http.post('/api/simulate', async ({ request }) => {
    await delay(500); // Simulate processing time

    const body = (await request.json()) as WorkflowGraph;
    const { nodes, edges } = body;

    // Build execution order using topological sort
    const steps: SimulationStep[] = [];
    const errors: string[] = [];

    // Validation
    const startNodes = nodes.filter((n) => n.data.type === 'start');
    if (startNodes.length === 0) {
      errors.push('Workflow must have a Start node');
    }
    if (startNodes.length > 1) {
      errors.push('Workflow can only have one Start node');
    }

    const endNodes = nodes.filter((n) => n.data.type === 'end');
    if (endNodes.length === 0) {
      errors.push('Workflow must have an End node');
    }

    // Check for orphaned nodes
    const connectedNodeIds = new Set<string>();
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    nodes.forEach((node) => {
      if (!connectedNodeIds.has(node.id) && nodes.length > 1) {
        errors.push(`Node "${node.data.label}" is not connected`);
      }
    });

    // Simple execution simulation (breadth-first traversal)
    if (errors.length === 0 && startNodes.length > 0) {
      const visited = new Set<string>();
      const queue = [startNodes[0].id];

      while (queue.length > 0) {
        const currentId = queue.shift()!;
        if (visited.has(currentId)) continue;
        visited.add(currentId);

        const currentNode = nodes.find((n) => n.id === currentId);
        if (!currentNode) continue;

        const details: Record<string, string> = {};
        if (currentNode.data.type === 'task') {
          details['Assignee'] = currentNode.data.assignee;
          details['Due Date'] = currentNode.data.dueDate;
        } else if (currentNode.data.type === 'approval') {
          details['Approver Role'] = currentNode.data.approverRole;
          details['Auto-Threshold'] = `${currentNode.data.autoApproveThreshold}%`;
        } else if (currentNode.data.type === 'automated') {
          details['Action'] = currentNode.data.actionId;
        } else if (currentNode.data.type === 'end') {
          details['Message'] = currentNode.data.endMessage;
        }

        steps.push({
          nodeId: currentNode.id,
          nodeName: currentNode.data.label,
          type: currentNode.data.type,
          status: 'completed',
          message: getStepMessage(currentNode.data.type, currentNode.data.label),
          timestamp: new Date().toISOString(),
          details,
        });

        // Add next nodes to queue
        const outgoingEdges = edges.filter((e) => e.source === currentId);
        outgoingEdges.forEach((edge) => {
          if (!visited.has(edge.target)) {
            queue.push(edge.target);
          }
        });
      }
    }

    const result: SimulationResult = {
      success: errors.length === 0,
      steps,
      errors,
    };

    return HttpResponse.json(result);
  }),
];

function getStepMessage(type: string, label: string): string {
  switch (type) {
    case 'start':
      return `[System] Workflow initialized with high-priority status: ${label}`;
    case 'task':
      return `[Action] Assigned human task with documentation requirement: ${label}`;
    case 'approval':
      return `[Review] Routed to stakeholders for cross-departmental approval: ${label}`;
    case 'automated':
      return `[Engine] Executed automated logic via Tredence AI Bridge: ${label}`;
    case 'end':
      return `[Complete] Workflow lifecycle concluded successfully: ${label}`;
    default:
      return `[Step] Successfully executed: ${label}`;
  }
}
