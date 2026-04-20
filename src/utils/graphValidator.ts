import { Edge } from 'reactflow';
import { WorkflowNode, ValidationError } from '@/types/workflow';

// ─────────────────────────────────────────────
//  Public API
// ─────────────────────────────────────────────

export interface ValidationReport {
  errors: ValidationError[];
  warnings: ValidationError[];
  /** 0–100 health score (100 = perfectly valid) */
  healthScore: number;
  /** Nodes that are unreachable from the start node */
  unreachableNodeIds: Set<string>;
  /** Nodes that can never reach an end node */
  deadEndNodeIds: Set<string>;
  /** Detected cycle paths (array of node-id arrays) */
  cyclePaths: string[][];
}

export function validateWorkflow(
  nodes: WorkflowNode[],
  edges: Edge[]
): ValidationError[] {
  return buildReport(nodes, edges).errors.concat(
    buildReport(nodes, edges).warnings
  );
}

export function buildReport(
  nodes: WorkflowNode[],
  edges: Edge[]
): ValidationReport {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (nodes.length === 0) {
    errors.push({ message: 'Canvas is empty. Add nodes to build a workflow.', severity: 'error' });
    return {
      errors,
      warnings,
      healthScore: 0,
      unreachableNodeIds: new Set(),
      deadEndNodeIds: new Set(),
      cyclePaths: [],
    };
  }

  // ── Structural checks ────────────────────────────────────────────────────

  // Self-loop detection
  edges.forEach((edge) => {
    if (edge.source === edge.target) {
      const node = nodes.find((n) => n.id === edge.source);
      errors.push({
        nodeId: edge.source,
        message: `"${node?.data.label ?? edge.source}" has a self-loop connection`,
        severity: 'error',
      });
    }
  });

  // Duplicate edge detection
  const edgeKeys = new Set<string>();
  edges.forEach((edge) => {
    const key = `${edge.source}→${edge.target}`;
    if (edgeKeys.has(key)) {
      warnings.push({
        message: `Duplicate connection detected between two nodes (edge: ${key})`,
        severity: 'warning',
      });
    }
    edgeKeys.add(key);
  });

  // ── Node-type rules ──────────────────────────────────────────────────────

  const startNodes = nodes.filter((n) => n.data.type === 'start');
  const endNodes   = nodes.filter((n) => n.data.type === 'end');

  if (startNodes.length === 0) {
    errors.push({ message: 'Workflow must have exactly one Start node', severity: 'error' });
  } else if (startNodes.length > 1) {
    errors.push({ message: 'Workflow can only have one Start node', severity: 'error' });
    startNodes.forEach((n) =>
      errors.push({ nodeId: n.id, message: `Duplicate Start node: "${n.data.label}"`, severity: 'error' })
    );
  }

  if (endNodes.length === 0) {
    errors.push({ message: 'Workflow must have at least one End node', severity: 'error' });
  }

  // ── In/Out-degree checks ─────────────────────────────────────────────────

  const inDegree  = new Map<string, number>();
  const outDegree = new Map<string, number>();
  nodes.forEach((n) => { inDegree.set(n.id, 0); outDegree.set(n.id, 0); });
  edges.forEach((e) => {
    outDegree.set(e.source, (outDegree.get(e.source) ?? 0) + 1);
    inDegree.set(e.target,  (inDegree.get(e.target)  ?? 0) + 1);
  });

  nodes.forEach((node) => {
    const out = outDegree.get(node.id) ?? 0;
    const inn = inDegree.get(node.id)  ?? 0;

    if (node.data.type === 'start') {
      if (inn > 0) {
        warnings.push({ nodeId: node.id, message: `Start node "${node.data.label}" should not have incoming connections`, severity: 'warning' });
      }
      if (out === 0 && nodes.length > 1) {
        errors.push({ nodeId: node.id, message: `Start node "${node.data.label}" must have at least one outgoing connection`, severity: 'error' });
      }
    }

    if (node.data.type === 'end') {
      if (out > 0) {
        warnings.push({ nodeId: node.id, message: `End node "${node.data.label}" should not have outgoing connections`, severity: 'warning' });
      }
      if (inn === 0 && nodes.length > 1) {
        errors.push({ nodeId: node.id, message: `End node "${node.data.label}" has no incoming connections`, severity: 'error' });
      }
    }

    if (node.data.type !== 'start' && node.data.type !== 'end' && nodes.length > 1) {
      if (inn === 0) {
        warnings.push({ nodeId: node.id, message: `"${node.data.label}" has no incoming connections (orphaned entry)`, severity: 'warning' });
      }
      if (out === 0) {
        warnings.push({ nodeId: node.id, message: `"${node.data.label}" has no outgoing connections (dead end)`, severity: 'warning' });
      }
    }
  });

  // ── Cycle detection (DAG enforcement) ───────────────────────────────────

  const cyclePaths = detectAllCycles(nodes, edges);
  cyclePaths.forEach((path) => {
    const pathLabel = path
      .map((id) => `"${nodes.find((n) => n.id === id)?.data.label ?? id}"`)
      .join(' → ');
    errors.push({ message: `Cycle detected: ${pathLabel}`, severity: 'error' });
  });

  // ── Reachability from start ──────────────────────────────────────────────

  const unreachableNodeIds = new Set<string>();
  const deadEndNodeIds     = new Set<string>();

  if (startNodes.length === 1) {
    const startId = startNodes[0].id;

    // Forward BFS: nodes reachable from start
    const reachableFromStart = bfsForward(startId, edges);
    nodes.forEach((n) => {
      if (!reachableFromStart.has(n.id)) {
        unreachableNodeIds.add(n.id);
        warnings.push({
          nodeId: n.id,
          message: `"${n.data.label}" is unreachable from the Start node`,
          severity: 'warning',
        });
      }
    });

    // Backward BFS: nodes that CAN reach an end node
    const canReachEnd = new Set<string>();
    endNodes.forEach((n) => {
      bfsBackward(n.id, edges).forEach((id) => canReachEnd.add(id));
      canReachEnd.add(n.id);
    });

    nodes.forEach((n) => {
      if (!canReachEnd.has(n.id) && n.data.type !== 'end') {
        deadEndNodeIds.add(n.id);
        warnings.push({
          nodeId: n.id,
          message: `"${n.data.label}" cannot reach any End node (blocked path)`,
          severity: 'warning',
        });
      }
    });
  }

  // ── Health score calculation ─────────────────────────────────────────────

  const totalIssues = errors.length + warnings.length * 0.5;
  const maxIssues   = Math.max(nodes.length * 2, 1);
  const healthScore = Math.max(0, Math.round(100 - (totalIssues / maxIssues) * 100));

  return { errors, warnings, healthScore, unreachableNodeIds, deadEndNodeIds, cyclePaths };
}

// ─────────────────────────────────────────────
//  Internal helpers
// ─────────────────────────────────────────────

/**
 * Detects all back-edges (cycles) using an iterative DFS with a colour-coding scheme.
 * Returns an array of cycle paths (each path is an ordered list of node IDs).
 */
function detectAllCycles(nodes: WorkflowNode[], edges: Edge[]): string[][] {
  const adj = buildAdjacency(nodes, edges);
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const colour = new Map<string, 0 | 1 | 2>();
  const parent = new Map<string, string | null>();
  nodes.forEach((n) => { colour.set(n.id, WHITE); parent.set(n.id, null); });

  const cycles: string[][] = [];

  function dfs(nodeId: string): void {
    colour.set(nodeId, GRAY);
    const neighbours = adj.get(nodeId) ?? [];
    for (const nb of neighbours) {
      if (colour.get(nb) === GRAY) {
        // Back-edge found — reconstruct the cycle path
        const path: string[] = [nb];
        let cur: string | null | undefined = nodeId;
        while (cur && cur !== nb) {
          path.unshift(cur);
          cur = parent.get(cur);
        }
        path.unshift(nb);
        cycles.push(path);
      } else if (colour.get(nb) === WHITE) {
        parent.set(nb, nodeId);
        dfs(nb);
      }
    }
    colour.set(nodeId, BLACK);
  }

  for (const node of nodes) {
    if (colour.get(node.id) === WHITE) dfs(node.id);
  }

  return cycles;
}

function buildAdjacency(nodes: WorkflowNode[], edges: Edge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    if (e.source !== e.target) {        // exclude self-loops (handled separately)
      adj.get(e.source)?.push(e.target);
    }
  });
  return adj;
}

function bfsForward(startId: string, edges: Edge[]): Set<string> {
  const visited = new Set<string>([startId]);
  const queue   = [startId];
  while (queue.length > 0) {
    const cur = queue.shift()!;
    edges.forEach((e) => {
      if (e.source === cur && !visited.has(e.target)) {
        visited.add(e.target);
        queue.push(e.target);
      }
    });
  }
  return visited;
}

function bfsBackward(endId: string, edges: Edge[]): Set<string> {
  const visited = new Set<string>([endId]);
  const queue   = [endId];
  while (queue.length > 0) {
    const cur = queue.shift()!;
    edges.forEach((e) => {
      if (e.target === cur && !visited.has(e.source)) {
        visited.add(e.source);
        queue.push(e.source);
      }
    });
  }
  return visited;
}
