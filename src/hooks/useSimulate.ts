import { useState } from 'react';
import { SimulationResult, WorkflowGraph } from '@/types/workflow';

export function useSimulate() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulate = async (workflow: WorkflowGraph) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflow),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.errors?.[0] || `Simulation failed with status ${response.status}`);
      }

      const data: SimulationResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { simulate, result, loading, error, reset };
}
