import { useState } from 'react';
import { PlayCircle, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { useSimulate } from '@/hooks/useSimulate';
import { serializeWorkflow, downloadWorkflowJSON } from '@/utils/serializer';
import { validateWorkflow } from '@/utils/graphValidator';

export function SandboxPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const { simulate, result, loading, error, reset } = useSimulate();

  const handleSimulate = async () => {
    const workflow = serializeWorkflow(nodes, edges);
    await simulate(workflow);
  };

  const handleExport = () => {
    downloadWorkflowJSON(nodes, edges);
  };

  const validationErrors = validateWorkflow(nodes, edges);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 px-6 py-3 bg-primary-600 text-white rounded-lg shadow-lg hover:bg-primary-700 flex items-center gap-2 font-medium z-10"
      >
        <PlayCircle className="w-5 h-5" />
        Test Workflow
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Workflow Testing Sandbox
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
                className="p-1 text-gray-400 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Validation Issues</h3>
                  {validationErrors.map((err, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg flex items-start gap-2 ${
                        err.severity === 'error'
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-yellow-50 border border-yellow-200'
                      }`}
                    >
                      <AlertCircle
                        className={`w-5 h-5 flex-shrink-0 ${
                          err.severity === 'error' ? 'text-red-600' : 'text-yellow-600'
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            err.severity === 'error' ? 'text-red-800' : 'text-yellow-800'
                          }`}
                        >
                          {err.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Workflow Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Workflow Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Nodes:</span>{' '}
                    <span className="font-medium text-gray-900">{nodes.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Connections:</span>{' '}
                    <span className="font-medium text-gray-900">{edges.length}</span>
                  </div>
                </div>
              </div>

              {/* Simulation Results */}
              {result && (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg flex items-center gap-2 ${
                      result.success
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span
                      className={`font-medium ${
                        result.success ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {result.success
                        ? 'Simulation completed successfully'
                        : 'Simulation failed'}
                    </span>
                  </div>

                  {result.errors.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">Errors</h3>
                      {result.errors.map((err, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800"
                        >
                          {err}
                        </div>
                      ))}
                    </div>
                  )}

                  {result.steps.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">Execution Steps</h3>
                      <div className="space-y-2">
                        {result.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white border border-gray-200 rounded-lg"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-xs font-medium text-primary-700">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">
                                  {step.nodeName}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {step.message}
                                </div>
                              </div>
                              <div
                                className={`text-xs font-medium px-2 py-1 rounded ${
                                  step.status === 'completed'
                                    ? 'bg-green-100 text-green-700'
                                    : step.status === 'failed'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {step.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <p className="font-medium">Error</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleSimulate}
                disabled={loading || nodes.length === 0}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    Run Simulation
                  </>
                )}
              </button>
              <button
                onClick={handleExport}
                disabled={nodes.length === 0}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
              >
                Export JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
