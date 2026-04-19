import { useForm } from 'react-hook-form';
import { EndNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

interface EndNodeFormProps {
  nodeId: string;
  data: EndNodeData;
}

export function EndNodeForm({ nodeId, data }: EndNodeFormProps) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  const { register, handleSubmit } = useForm<EndNodeData>({
    defaultValues: data,
  });

  const onSubmit = (formData: EndNodeData) => {
    updateNodeData(nodeId, formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Message
        </label>
        <textarea
          {...register('endMessage')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
        <p className="mt-1 text-xs text-gray-500">
          Message displayed when workflow completes
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            {...register('showSummary')}
            type="checkbox"
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            onChange={handleSubmit(onSubmit)}
          />
          <span className="text-sm font-medium text-gray-700">Show Summary</span>
        </label>
        <p className="mt-1 text-xs text-gray-500 ml-6">
          Display workflow summary on completion
        </p>
      </div>
    </form>
  );
}
