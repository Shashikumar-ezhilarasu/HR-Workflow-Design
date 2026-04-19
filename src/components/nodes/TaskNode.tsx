import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { CheckSquare } from 'lucide-react';
import { TaskNodeData } from '@/types/workflow';

export const TaskNode = memo(({ data, selected }: NodeProps<TaskNodeData>) => {
  return (
    <div
      className={`
        px-4 py-3 rounded-lg border-2 bg-white dark:bg-[#2a2a3c] shadow-lg min-w-[200px] transition-colors duration-200
        ${selected ? 'border-blue-500 shadow-blue-500/20' : 'border-gray-200 dark:border-[#3f3f5a]'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-500/10 rounded-lg shrink-0 transition-colors">
          <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Task</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{data.title}</div>
          {data.assignee && (
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 block"></span>

              {data.assignee}
            </div>
          )}
        </div>
      </div>
      
      {/* Mock Analytics Footer from UI */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-[#3f3f5a] flex items-center justify-between px-1 transition-colors duration-200">
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">I</div><div className="text-xs font-bold text-blue-600 dark:text-blue-400">15</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">II</div><div className="text-xs font-bold text-purple-600 dark:text-purple-400">55</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">III</div><div className="text-xs font-bold text-orange-600 dark:text-orange-400">41</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">IV</div><div className="text-xs font-bold text-green-600 dark:text-green-400">69</div></div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3.5 h-3.5 bg-white dark:bg-[#1e1e2d] border-2 border-blue-500" />
      <Handle type="source" position={Position.Right} className="w-3.5 h-3.5 bg-white dark:bg-[#1e1e2d] border-2 border-blue-500" />

    </div>

  );
});

TaskNode.displayName = 'TaskNode';
