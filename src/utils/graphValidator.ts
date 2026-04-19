import { Edge } from 'reactflow';
import { WorkflowNode, ValidationError } from '@/types/workflow';

export function validateWorkflow(
  nodes: WorkflowNode[],
  edges: Edge[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check for start node
  const startNodes = nodes.filter((n) => n.data.type === 'start');
  if (startNodes.length === 0) {
    errors.push({
      message: 'Workflow must have exactly one Start node',
      severity: 'error',
    });
  } else if (startNodes.length > 1) {
    errors.push({
      message: 'Workflow can only have one Start node',
      severity: 'error',
    });
  }

  // Check for end node
  const endNodes = nodes.filter((n) => n.data.type === 'end');
  if (endNodes.length === 0) {
    errors.push({
      message: 'Workflow must have at least one End node',
      severity: 'error',
    });
  }

  // Check for orphaned nodes (if more than one node exists)
  if (nodes.length > 1) {
    const connectedNodeIds = new Set<string>();
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    nodes.forEach((node) => {
      if (!connectedNodeIds.has(node.id)) {
        errors.push({
          nodeId: node.id,
          message: `"${node.data.label}" is not connected to the workflow`,
          severity: 'warning',
        });
      }
    });
  }

  // Check for cycles (using DFS)
  const hasCycle = detectCycle(nodes, edges);
  if (hasCycle) {
    errors.push({
      message: 'Workflow contains a cycle (circular dependency)',
      severity: 'error',
    });
  }

  // Check start node has outgoing connections
  if (startNodes.length === 1 && nodes.length > 1) {
    const startNodeId = startNodes[0].id;
    const hasOutgoing = edges.some((e) => e.source === startNodeId);
    if (!hasOutgoing) {
      errors.push({
        nodeId: startNodeId,
        message: 'Start node must have at least one outgoing connection',
        severity: 'error',
      });
    }
  }

  return errors;
}

function detectCycle(nodes: WorkflowNode[], edges: Edge[]): boolean {
  const visited = new Set<string>();
  const recStack = new Set<string>();

  const adjacencyList = new Map<string, string[]>();
  nodes.forEach((node) => adjacencyList.set(node.id, []));
  edges.forEach((edge) => {
    adjacencyList.get(edge.source)?.push(edge.target);
  });

  function dfs(nodeId: string): boolean {
    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
}
