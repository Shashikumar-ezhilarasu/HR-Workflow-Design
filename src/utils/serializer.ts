import { Edge } from 'reactflow';
import { WorkflowNode, WorkflowGraph } from '@/types/workflow';

export function serializeWorkflow(
  nodes: WorkflowNode[],
  edges: Edge[]
): WorkflowGraph {
  return {
    nodes,
    edges,
  };
}

export function exportWorkflowAsJSON(
  nodes: WorkflowNode[],
  edges: Edge[]
): string {
  const workflow = serializeWorkflow(nodes, edges);
  return JSON.stringify(workflow, null, 2);
}

export function downloadWorkflowJSON(
  nodes: WorkflowNode[],
  edges: Edge[],
  filename: string = 'workflow.json'
): void {
  const json = exportWorkflowAsJSON(nodes, edges);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
