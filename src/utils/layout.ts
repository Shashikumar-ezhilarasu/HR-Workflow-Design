import dagre from 'dagre';
import { Edge } from 'reactflow';
import { WorkflowNode } from '@/types/workflow';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (nodes: WorkflowNode[], edges: Edge[], direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    // Arbitrary default sizes for dagre positioning if dimensions aren't available
    const width = node.width || 250;
    const height = node.height || 100;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // Shift DAGRE's default center position to top-left position React Flow uses
      position: {
        x: nodeWithPosition.x - (node.width || 250) / 2,
        y: nodeWithPosition.y - (node.height || 100) / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes as WorkflowNode[], edges };
};
