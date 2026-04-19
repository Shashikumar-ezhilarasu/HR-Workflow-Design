import { useForm } from 'react-hook-form';
import { AutomatedStepNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';
import { useAutomations } from '@/hooks/useAutomations';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface AutomatedStepFormProps {
  nodeId: string;
  data: AutomatedStepNodeData;
}

export function AutomatedStepForm({ nodeId, data }: AutomatedStepFormProps) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const { automations, loading } = useAutomations();
  const [paramKey, setParamKey] = useState('');
  const [paramValue, setParamValue] = useState('');

  const { register, handleSubmit, watch } = useForm<AutomatedStepNodeData>({
    defaultValues: data,
  });

  const formData = watch();
  const selectedAction = automations.find((a) => a.id === formData.actionId);

  const onSubmit = (formData: AutomatedStepNodeData) => {
    updateNodeData(nodeId, formData);
  };

  const addParam = () => {
    if (paramKey && paramValue) {
      updateNodeData(nodeId, {
        ...formData,
        actionParams: { ...formData.actionParams, [paramKey]: paramValue },
      });
      setParamKey('');
      setParamValue('');
    }
  };

  const removeParam = (key: string) => {
    const newParams = { ...formData.actionParams };
    delete newParams[key];
    updateNodeData(nodeId, { ...formData, actionParams: newParams });
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          onBlur={handleSubmit(onSubmit)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Action Type
        </label>
        {loading ? (
          <div className="text-sm text-gray-500">Loading actions...</div>
        ) : (
          <select
            {...register('actionId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            onChange={handleSubmit(onSubmit)}
          >
            <option value="">Select an action...</option>
            {automations.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAction && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Action Parameters
          </label>
          <div className="mb-2 p-2 bg-orange-50 rounded text-xs text-orange-700">
            Required params: {selectedAction.params.join(', ')}
          </div>

          <div className="space-y-2">
            {Object.entries(formData.actionParams).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="flex-1">
                  <span className="text-xs font-medium text-gray-600">{key}:</span>{' '}
                  <span className="text-sm text-gray-800">{value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeParam(key)}
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
              placeholder="Parameter name"
              value={paramKey}
              onChange={(e) => setParamKey(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Value"
              value={paramValue}
              onChange={(e) => setParamValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="button"
              onClick={addParam}
              className="px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
