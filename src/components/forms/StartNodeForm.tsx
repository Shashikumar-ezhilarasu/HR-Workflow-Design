import { useForm } from 'react-hook-form';
import { StartNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface StartNodeFormProps {
  nodeId: string;
  data: StartNodeData;
}

export function StartNodeForm({ nodeId, data }: StartNodeFormProps) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const [metadataKey, setMetadataKey] = useState('');
  const [metadataValue, setMetadataValue] = useState('');

  const { register, handleSubmit, watch } = useForm<StartNodeData>({
    defaultValues: data,
  });

  const formData = watch();

  const onSubmit = (formData: StartNodeData) => {
    updateNodeData(nodeId, formData);
  };

  const addMetadata = () => {
    if (metadataKey && metadataValue) {
      updateNodeData(nodeId, {
        ...formData,
        metadata: { ...formData.metadata, [metadataKey]: metadataValue },
      });
      setMetadataKey('');
      setMetadataValue('');
    }
  };

  const removeMetadata = (key: string) => {
    const newMetadata = { ...formData.metadata };
    delete newMetadata[key];
    updateNodeData(nodeId, { ...formData, metadata: newMetadata });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Title
        </label>
        <input
          {...register('title')}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Metadata (Optional)
        </label>
        <div className="space-y-2">
          {Object.entries(formData.metadata).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-600">{key}:</span>{' '}
                <span className="text-sm text-gray-800">{value}</span>
              </div>
              <button
                type="button"
                onClick={() => removeMetadata(key)}
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
            placeholder="Key"
            value={metadataKey}
            onChange={(e) => setMetadataKey(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Value"
            value={metadataValue}
            onChange={(e) => setMetadataValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            type="button"
            onClick={addMetadata}
            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
