import { http, HttpResponse, delay } from 'msw';
import { mockAutomations } from './mockData';
import {
  WorkflowGraph,
  SimulationResult,
  SimulationStep,
  BranchDecision,
  WorkflowNode,
} from '@/types/workflow';
import { Edge } from 'reactflow';

// ─────────────────────────────────────────────
//  GET /api/automations
// ─────────────────────────────────────────────

export const handlers = [
  http.get('/api/automations', async () => {
    await delay(300);
    return HttpResponse.json(mockAutomations);
  }),

  // ─────────────────────────────────────────────
  //  POST /api/simulate
  // ─────────────────────────────────────────────
  http.post('/api/simulate', async ({ request }) => {
    const startTime = Date.now();
    try {
      await delay(400); // Simulate brief network latency

      const body = (await request.json().catch(() => ({}))) as WorkflowGraph;
      const { nodes = [], edges = [] } = body;

    const errors: string[]    = [];
    const steps: SimulationStep[] = [];
    const branchDecisions: BranchDecision[] = [];
    const executionPath: string[]  = [];

    // ── Pre-flight validation ───────────────────────────────────────────────

    const startNodes = nodes.filter((n) => n.data.type === 'start');
    const endNodes   = nodes.filter((n) => n.data.type === 'end');

    if (startNodes.length === 0) {
      errors.push('Workflow must have a Start node to execute');
      return HttpResponse.json(buildFailResult(errors, startTime));
    }
    if (startNodes.length > 1) {
      errors.push('Workflow can only have one Start node — multiple Start nodes cause ambiguous execution');
      return HttpResponse.json(buildFailResult(errors, startTime));
    }
    if (endNodes.length === 0) {
      errors.push('Workflow must have at least one End node');
      return HttpResponse.json(buildFailResult(errors, startTime));
    }

    // Detect self-loops
    const selfLoops = edges.filter((e) => e.source === e.target);
    if (selfLoops.length > 0) {
      selfLoops.forEach((e) => {
        const node = nodes.find((n) => n.id === e.source);
        errors.push(`Self-loop detected on node "${node?.data.label ?? e.source}" — cannot execute cyclic workflows`);
      });
      return HttpResponse.json(buildFailResult(errors, startTime));
    }

    // Cycle detection via Kahn's topological sort
    const { order: topoOrder, hasCycle } = topologicalSort(nodes, edges);
    if (hasCycle) {
      errors.push('Workflow contains a circular dependency (cycle). All paths must flow in one direction.');
      return HttpResponse.json(buildFailResult(errors, startTime));
    }

    // Connected-node check
    const connectedIds = new Set<string>();
    edges.forEach((e) => { connectedIds.add(e.source); connectedIds.add(e.target); });
    nodes.forEach((n) => {
      if (!connectedIds.has(n.id) && nodes.length > 1) {
        errors.push(`Node "${n.data.label}" is disconnected — all nodes must be part of the flow`);
      }
    });

    if (errors.length > 0) {
      return HttpResponse.json(buildFailResult(errors, startTime));
    }

    // ── BFS Execution traversal ────────────────────────────────────────────
    // Uses topological order as a filter to avoid processing un-reached nodes

    const topoSet  = new Set(topoOrder);
    const visited  = new Set<string>();
    const queue: string[] = [startNodes[0].id];
    let stepIdx = 0;

    while (queue.length > 0) {
      const currentId = queue.shift()!;

      if (visited.has(currentId)) continue;
      if (!topoSet.has(currentId))  continue;   // Safety: skip nodes not in valid topo order
      visited.add(currentId);
      executionPath.push(currentId);

      const currentNode = nodes.find((n) => n.id === currentId);
      if (!currentNode) continue;

      // Simulate realistic per-node processing delay
      const nodeDurationMs = simulateNodeDuration(currentNode.data.type);

      const { details, failed, failReason } = buildNodeDetails(currentNode, nodes);

      const stepStatus: SimulationStep['status'] = failed ? 'failed' : 'completed';
      const stepMsg = failed
        ? failReason!
        : getStepMessage(currentNode.data.type, currentNode.data.label, details);

      steps.push({
        nodeId:    currentNode.id,
        nodeName:  currentNode.data.label,
        type:      currentNode.data.type,
        status:    stepStatus,
        message:   stepMsg,
        timestamp: new Date().toISOString(),
        durationMs: nodeDurationMs,
        stepIndex: stepIdx++,
        details,
      });

      // If a node hard-fails, stop execution on this path
      if (failed && currentNode.data.type !== 'approval') {
        errors.push(`Execution halted at "${currentNode.data.label}": ${failReason}`);
        break;
      }

      // ── Branch resolution ──────────────────────────────────────────────
      const outgoing = edges.filter((e) => e.source === currentId);

      if (outgoing.length === 0) continue; // terminal node

      if (outgoing.length === 1) {
        // Single outgoing — deterministic
        if (!visited.has(outgoing[0].target)) {
          queue.push(outgoing[0].target);
        }
      } else {
        // Multiple outgoing edges — resolve branching
        const { chosen, others, decision } = resolveBranch(currentNode, outgoing, nodes, failed);
        branchDecisions.push(decision);

        // Queue the chosen path first, then other branches (parallel if approval passes)
        if (!visited.has(chosen)) queue.push(chosen);

        // For approval nodes that failed, skip the "approved" branch entirely
        if (!failed) {
          others.forEach((t) => { if (!visited.has(t)) queue.push(t); });
        } else {
          steps.push({
            nodeId:    `skip-${currentId}`,
            nodeName:  `Skipped downstream of "${currentNode.data.label}"`,
            type:      currentNode.data.type,
            status:    'skipped',
            message:   `[Skip] Downstream nodes bypassed after rejection at "${currentNode.data.label}"`,
            timestamp: new Date().toISOString(),
            stepIndex: stepIdx++,
          });
        }
      }
    }

    const result: SimulationResult = {
      success:         errors.length === 0,
      steps,
      errors,
      durationMs:      Math.round(Date.now() - startTime),
      executionPath,
      branchDecisions,
    };

    return HttpResponse.json(result);
    } catch (err) {
      console.error('Simulation Error:', err);
      return HttpResponse.json({
        success: false,
        steps: [],
        errors: [err instanceof Error ? err.message : 'Internal Simulation Engine Error'],
        durationMs: Math.round(Date.now() - startTime),
      }, { status: 500 });
    }
  }),
];

// ─────────────────────────────────────────────
//  Topological sort (Kahn's algorithm / BFS)
// ─────────────────────────────────────────────

function topologicalSort(
  nodes: WorkflowNode[],
  edges: Edge[]
): { order: string[]; hasCycle: boolean } {
  const inDegree = new Map<string, number>();
  const adj      = new Map<string, string[]>();

  nodes.forEach((n) => { inDegree.set(n.id, 0); adj.set(n.id, []); });
  edges.forEach((e) => {
    if (e.source !== e.target) {
      adj.get(e.source)?.push(e.target);
      inDegree.set(e.target, (inDegree.get(e.target) ?? 0) + 1);
    }
  });

  const queue  = nodes.filter((n) => (inDegree.get(n.id) ?? 0) === 0).map((n) => n.id);
  const order: string[] = [];

  while (queue.length > 0) {
    const cur = queue.shift()!;
    order.push(cur);
    (adj.get(cur) ?? []).forEach((nb) => {
      const deg = (inDegree.get(nb) ?? 0) - 1;
      inDegree.set(nb, deg);
      if (deg === 0) queue.push(nb);
    });
  }

  return { order, hasCycle: order.length !== nodes.length };
}

// ─────────────────────────────────────────────
//  Node detail / failure simulation
// ─────────────────────────────────────────────

function buildNodeDetails(
  node: WorkflowNode,
  _nodes: WorkflowNode[]
): { details: Record<string, string>; failed: boolean; failReason?: string } {
  const details: Record<string, string> = {};
  let failed    = false;
  let failReason: string | undefined;

  switch (node.data.type) {
    case 'start':
      details['Trigger']   = 'Manual / Scheduled';
      details['Priority']  = 'High';
      details['Initiated'] = new Date().toLocaleTimeString();
      break;

    case 'task': {
      details['Assignee'] = node.data.assignee || 'Unassigned';
      details['Due Date'] = node.data.dueDate  || 'Not set';
      details['Status']   = 'In Progress';
      // Simulate missing assignee as a soft-failure warning
      if (!node.data.assignee) {
        details['Warning'] = 'No assignee — task auto-escalated to manager';
      }
      break;
    }

    case 'approval': {
      details['Approver Role']   = node.data.approverRole || 'Manager';
      details['Threshold']       = `${node.data.autoApproveThreshold ?? 80}%`;
      // Deterministic simulation: auto-approve if threshold ≥ 80
      const threshold = node.data.autoApproveThreshold ?? 80;
      if (threshold >= 80) {
        details['Decision'] = 'Auto-Approved';
        details['Score']    = `${threshold}%`;
      } else {
        details['Decision'] = 'Sent for manual review';
        details['Score']    = `${threshold}% (below threshold)`;
        failed = true;
        failReason = `[Approval Required] Approval score ${threshold}% is below mandatory threshold of 80%. Routed to ${node.data.approverRole || 'Manager'} for manual review.`;
      }
      break;
    }

    case 'automated': {
      details['Action ID']  = node.data.actionId  || 'generic-action';
      details['Params']     = Object.keys(node.data.actionParams ?? {}).join(', ') || 'none';
      details['Engine']     = 'Tredence AI Bridge v2';
      details['Exit Code']  = '0 (success)';
      break;
    }

    case 'end': {
      details['Outcome']  = node.data.endMessage || 'Workflow completed';
      details['Summary']  = node.data.showSummary ? 'Full report generated' : 'Suppressed';
      break;
    }
  }

  return { details, failed, failReason };
}

// ─────────────────────────────────────────────
//  Branch resolution
// ─────────────────────────────────────────────

function resolveBranch(
  node: WorkflowNode,
  outgoing: Edge[],
  nodes: WorkflowNode[],
  failed: boolean
): { chosen: string; others: string[]; decision: BranchDecision } {
  // Default: pick the first outgoing edge as "chosen"
  // If approval failed, prefer edges labelled "reject"/"no" (if labelled), else just first
  let chosen: Edge;

  if (node.data.type === 'approval' && failed) {
    chosen = outgoing.find((e) =>
      String(e.label ?? '').toLowerCase().includes('reject') ||
      String(e.label ?? '').toLowerCase().includes('no')
    ) ?? outgoing[outgoing.length - 1];
  } else {
    chosen = outgoing.find((e) =>
      String(e.label ?? '').toLowerCase().includes('approve') ||
      String(e.label ?? '').toLowerCase().includes('yes')
    ) ?? outgoing[0];
  }

  const others = outgoing.filter((e) => e.id !== chosen.id).map((e) => e.target);
  const chosenNode = nodes.find((n) => n.id === chosen.target);

  const decision: BranchDecision = {
    nodeId:          node.id,
    nodeName:        node.data.label,
    chosenTargetId:  chosen.target,
    chosenTargetName: chosenNode?.data.label ?? chosen.target,
    reason: failed
      ? `Approval threshold not met — routed to rejection path`
      : `Condition satisfied — continuing primary flow`,
  };

  return { chosen: chosen.target, others, decision };
}

// ─────────────────────────────────────────────
//  Step message builder
// ─────────────────────────────────────────────

function getStepMessage(
  type: string,
  label: string,
  details: Record<string, string>
): string {
  switch (type) {
    case 'start':
      return `[Workflow Engine] Execution started — "${label}" triggered with priority: ${details['Priority'] ?? 'Standard'}`;
    case 'task':
      return `[Task Runner] Human task "${label}" dispatched to ${details['Assignee'] ?? 'Unassigned'}. Due: ${details['Due Date'] ?? 'TBD'}`;
    case 'approval':
      return `[Approval Gate] "${label}" evaluated — Decision: ${details['Decision'] ?? 'Pending'} (Score: ${details['Score'] ?? 'N/A'})`;
    case 'automated':
      return `[Automation Engine] Action "${label}" executed via ${details['Engine'] ?? 'AI Bridge'} — Exit: ${details['Exit Code'] ?? '0'}`;
    case 'end':
      return `[Workflow Complete] "${label}" — ${details['Outcome'] ?? 'Workflow concluded successfully'}`;
    default:
      return `[Step] "${label}" processed successfully`;
  }
}

// ─────────────────────────────────────────────
//  Per-node simulated processing duration (ms)
// ─────────────────────────────────────────────

function simulateNodeDuration(type: string): number {
  const base: Record<string, number> = {
    start:     50,
    task:      200,
    approval:  350,
    automated: 120,
    end:       30,
  };
  const b = base[type] ?? 100;
  // Add slight random variance ±20%
  return Math.round(b + (Math.random() - 0.5) * b * 0.4);
}

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

function buildFailResult(errors: string[], startMs: number): SimulationResult {
  return {
    success:      false,
    steps:        [],
    errors,
    durationMs:   Math.round(Date.now() - startMs),
    executionPath: [],
    branchDecisions: [],
  };
}
