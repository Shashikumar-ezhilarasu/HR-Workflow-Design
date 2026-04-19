import { useState, useEffect } from 'react';
import { AutomationAction } from '@/types/workflow';

export function useAutomations() {
  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/automations')
      .then((res) => res.json())
      .then((data) => {
        setAutomations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { automations, loading, error };
}
