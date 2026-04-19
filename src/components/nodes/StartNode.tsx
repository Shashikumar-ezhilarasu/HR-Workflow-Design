import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Play } from 'lucide-react';
import { StartNodeData } from '@/types/workflow';

export const StartNode = memo(({ data, selected }: NodeProps<StartNodeData>) => {
  return (
    <div
      className={`
        px-4 py-3 rounded-lg border-2 bg-white dark:bg-[#2a2a3c] shadow-lg min-w-[200px] transition-colors duration-200
        ${selected ? 'border-green-500 shadow-green-500/20' : 'border-gray-200 dark:border-[#3f3f5a]'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-green-100 dark:bg-green-500/10 rounded-lg shrink-0 transition-colors">
          <Play className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Start</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{data.title}</div>
        </div>
      </div>
      
      {/* Mock Analytics Footer from UI */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-[#3f3f5a] flex items-center justify-between px-1 transition-colors duration-200">
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">I</div><div className="text-xs font-bold text-blue-600 dark:text-blue-400">99</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">II</div><div className="text-xs font-bold text-purple-600 dark:text-purple-400">12</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">III</div><div className="text-xs font-bold text-orange-600 dark:text-orange-400">45</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">IV</div><div className="text-xs font-bold text-green-600 dark:text-green-400">88</div></div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3.5 h-3.5 bg-white dark:bg-[#1e1e2d] border-2 border-green-500" />
    </div>
  );
});

StartNode.displayName = 'StartNode';
