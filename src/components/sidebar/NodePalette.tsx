import { Play, CheckSquare, UserCheck, Zap, Flag } from 'lucide-react';
import { NodeType } from '@/types/workflow';

const nodeTypes: Array<{
  type: NodeType;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}> = [
  {
    type: 'start',
    label: 'Start',
    icon: <Play className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Workflow entry point',
  },
  {
    type: 'task',
    label: 'Task',
    icon: <CheckSquare className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Human task assignment',
  },
  {
    type: 'approval',
    label: 'Approval',
    icon: <UserCheck className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Manager/HR approval',
  },
  {
    type: 'automated',
    label: 'Automated Step',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    description: 'System-triggered action',
  },
  {
    type: 'end',
    label: 'End',
    icon: <Flag className="w-5 h-5" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    description: 'Workflow completion',
  },
];

export function NodePalette() {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white dark:bg-[#1e1e2d] border-r border-gray-200 dark:border-[#2a2a3c] p-4 flex flex-col h-full transition-colors duration-200">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-3 uppercase tracking-wide">
        Node Types
      </h3>
      <div className="space-y-3">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
            className="p-3 bg-gray-50 dark:bg-[#2a2a3c] border border-gray-200 dark:border-[#3f3f5a] rounded-xl cursor-move hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${node.bgColor} bg-opacity-50 dark:bg-opacity-20`}>
                <div className={node.color}>{node.icon}</div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{node.label}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight mt-0.5">{node.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl border border-blue-100 dark:border-blue-500/20">
        <p className="text-xs text-blue-700 dark:text-blue-300 font-semibold mb-2">How to use:</p>
        <ul className="text-[11px] text-blue-600 dark:text-blue-200/80 space-y-1.5 list-disc pl-3">
          <li>Drag nodes onto canvas</li>
          <li>Click to select and edit</li>
          <li>Connect with edges</li>
          <li>Test in sandbox</li>
        </ul>
      </div>
    </div>
  );
}
