import { WorkflowNode, NodeType, WorkflowNodeData } from '@/types/workflow';

let nodeIdCounter = 0;

export function createNode(
  type: NodeType,
  position: { x: number; y: number }
): WorkflowNode {
  const id = `${type}-${Date.now()}-${nodeIdCounter++}`;

  const nodeData: WorkflowNodeData = createDefaultNodeData(type);

  return {
    id,
    type: type,
    position,
    data: nodeData,
  };
}

function createDefaultNodeData(type: NodeType): WorkflowNodeData {
  switch (type) {
    case 'start':
      return {
        type: 'start',
        label: 'Start',
        title: 'Workflow Start',
        metadata: {},
      };
    case 'task':
      return {
        type: 'task',
        label: 'Task',
        title: 'New Task',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: {},
      };
    case 'approval':
      return {
        type: 'approval',
        label: 'Approval',
        title: 'Approval Required',
        approverRole: '',
        autoApproveThreshold: 0,
      };
    case 'automated':
      return {
        type: 'automated',
        label: 'Automated Step',
        title: 'Automated Action',
        actionId: '',
        actionParams: {},
      };
    case 'end':
      return {
        type: 'end',
        label: 'End',
        endMessage: 'Workflow completed successfully',
        showSummary: true,
      };
  }
}
