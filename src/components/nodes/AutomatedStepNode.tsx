import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Zap } from 'lucide-react';
import { AutomatedStepNodeData } from '@/types/workflow';

export const AutomatedStepNode = memo(({ data, selected }: NodeProps<AutomatedStepNodeData>) => {
  return (
    <div
      className={`
        px-4 py-3 rounded-lg border-2 bg-white dark:bg-[#2a2a3c] shadow-lg min-w-[200px] transition-colors duration-200
        ${selected ? 'border-orange-500 shadow-orange-500/20' : 'border-gray-200 dark:border-[#3f3f5a]'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-orange-100 dark:bg-orange-500/10 rounded-lg shrink-0 transition-colors">
          <Zap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Automated</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{data.title}</div>
          {data.actionId && (
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 block"></span>
              {data.actionId}
            </div>
          )}
        </div>
      </div>

      {/* Mock Analytics Footer from UI */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-[#3f3f5a] flex items-center justify-between px-1 transition-colors duration-200">
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">I</div><div className="text-xs font-bold text-blue-600 dark:text-blue-400">87</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">II</div><div className="text-xs font-bold text-purple-600 dark:text-purple-400">34</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">III</div><div className="text-xs font-bold text-orange-600 dark:text-orange-400">17</div></div>
        <div className="text-center"><div className="text-[10px] text-gray-400 dark:text-gray-500">IV</div><div className="text-xs font-bold text-green-600 dark:text-green-400">18</div></div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3.5 h-3.5 bg-white dark:bg-[#1e1e2d] border-2 border-orange-500" />
      <Handle type="source" position={Position.Right} className="w-3.5 h-3.5 bg-white dark:bg-[#1e1e2d] border-2 border-orange-500" />
    </div>
  );
});

AutomatedStepNode.displayName = 'AutomatedStepNode';
