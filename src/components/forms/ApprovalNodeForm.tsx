import { useForm } from 'react-hook-form';
import { ApprovalNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

interface ApprovalNodeFormProps {
  nodeId: string;
  data: ApprovalNodeData;
}

export function ApprovalNodeForm({ nodeId, data }: ApprovalNodeFormProps) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  const { register, handleSubmit } = useForm<ApprovalNodeData>({
    defaultValues: data,
  });

  const onSubmit = (formData: ApprovalNodeData) => {
    updateNodeData(nodeId, formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          {...register('title')}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Approver Role
        </label>
        <input
          {...register('approverRole')}
          type="text"
          placeholder="e.g., Manager, HRBP, Director"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
        <p className="mt-1 text-xs text-gray-500">
          Specify the role required to approve this step
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Auto-Approve Threshold
        </label>
        <input
          {...register('autoApproveThreshold', { valueAsNumber: true })}
          type="number"
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
        <p className="mt-1 text-xs text-gray-500">
          Automatically approve if value is below this threshold (0 = manual only)
        </p>
      </div>
    </form>
  );
}
