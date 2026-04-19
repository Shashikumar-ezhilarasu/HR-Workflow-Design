import { useForm } from 'react-hook-form';
import { TaskNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TaskNodeFormProps {
  nodeId: string;
  data: TaskNodeData;
}

export function TaskNodeForm({ nodeId, data }: TaskNodeFormProps) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const [customKey, setCustomKey] = useState('');
  const [customValue, setCustomValue] = useState('');

  const { register, handleSubmit, watch } = useForm<TaskNodeData>({
    defaultValues: data,
  });

  const formData = watch();

  const onSubmit = (formData: TaskNodeData) => {
    updateNodeData(nodeId, formData);
  };

  const addCustomField = () => {
    if (customKey && customValue) {
      updateNodeData(nodeId, {
        ...formData,
        customFields: { ...formData.customFields, [customKey]: customValue },
      });
      setCustomKey('');
      setCustomValue('');
    }
  };

  const removeCustomField = (key: string) => {
    const newFields = { ...formData.customFields };
    delete newFields[key];
    updateNodeData(nodeId, { ...formData, customFields: newFields });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register('title', { required: true })}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assignee
        </label>
        <input
          {...register('assignee')}
          type="text"
          placeholder="e.g., John Doe, HR Team"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          {...register('dueDate')}
          type="text"
          placeholder="e.g., 2024-12-31 or 3 days"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Fields (Optional)
        </label>
        <div className="space-y-2">
          {Object.entries(formData.customFields).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-600">{key}:</span>{' '}
                <span className="text-sm text-gray-800">{value}</span>
              </div>
              <button
                type="button"
                onClick={() => removeCustomField(key)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Field name"
            value={customKey}
            onChange={(e) => setCustomKey(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Value"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            type="button"
            onClick={addCustomField}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
