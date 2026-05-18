import { useState } from 'react';

export function useKnapsack(apiUrl = 'http://localhost:8000') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const solveKnapsack = async (weights, values, capacity) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${apiUrl}/api/solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weights, values, capacity }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to solve the knapsack problem.');
      }

      setResult(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return { solveKnapsack, result, loading, error, clearResult };
}
