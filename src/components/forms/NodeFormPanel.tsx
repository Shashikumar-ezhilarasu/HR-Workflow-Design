import { useWorkflowStore } from '@/store/workflowStore';
import { StartNodeForm } from './StartNodeForm';
import { TaskNodeForm } from './TaskNodeForm';
import { ApprovalNodeForm } from './ApprovalNodeForm';
import { AutomatedStepForm } from './AutomatedStepForm';
import { EndNodeForm } from './EndNodeForm';
import { X, Trash2 } from 'lucide-react';

export function NodeFormPanel() {
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);
  const nodes = useWorkflowStore((state) => state.nodes);
  const selectNode = useWorkflowStore((state) => state.selectNode);
  const deleteNode = useWorkflowStore((state) => state.deleteNode);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white dark:bg-[#1e1e2d] border-l border-gray-200 dark:border-[#2a2a3c] p-6 flex items-center justify-center text-gray-500 dark:text-gray-400 absolute right-0 top-0 h-full z-10 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.05)] transition-colors duration-200">
        <div className="text-center">
          <p className="text-sm">Select a node to configure</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Delete "${selectedNode.data.label}" node?`)) {
      deleteNode(selectedNodeId!);
    }
  };

  return (
    <div className="w-[320px] bg-white dark:bg-[#1e1e2d] border-l border-gray-200 dark:border-[#2a2a3c] flex flex-col h-full right-0 top-0 absolute z-10 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)] transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-[#2a2a3c] flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">Configure Node</h3>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="p-1.5 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
            title="Delete node"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => selectNode(null)}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3f3f5a] hover:text-gray-900 dark:hover:text-white rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>


      <div className="flex-1 overflow-y-auto p-4">
        {selectedNode.data.type === 'start' && (
          <StartNodeForm nodeId={selectedNodeId!} data={selectedNode.data} />
        )}
        {selectedNode.data.type === 'task' && (
          <TaskNodeForm nodeId={selectedNodeId!} data={selectedNode.data} />
        )}
        {selectedNode.data.type === 'approval' && (
          <ApprovalNodeForm nodeId={selectedNodeId!} data={selectedNode.data} />
        )}
        {selectedNode.data.type === 'automated' && (
          <AutomatedStepForm nodeId={selectedNodeId!} data={selectedNode.data} />
        )}
        {selectedNode.data.type === 'end' && (
          <EndNodeForm nodeId={selectedNodeId!} data={selectedNode.data} />
        )}
      </div>
    </div>
  );
}
