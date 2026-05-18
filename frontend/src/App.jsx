import React, { useState } from 'react';
import { useKnapsack } from './hooks/useKnapsack';
import Header from './components/Header';
import InputForm from './components/InputForm';
import EmptyState from './components/EmptyState';
import ResultCards from './components/ResultCards';
import ItemsTable from './components/ItemsTable';
import PerformanceSummary from './components/PerformanceSummary';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const { solveKnapsack, result, loading, error, clearResult } = useKnapsack();
  const [items, setItems] = useState([{ weight: '', value: '' }]);
  const [capacity, setCapacity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const weights = items.map((item) => item.weight).join(',');
    const values = items.map((item) => item.value).join(',');
    solveKnapsack(weights, values, capacity);
  };

  const resetForm = () => {
    setItems([{ weight: '', value: '' }]);
    setCapacity('');
    clearResult();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Header />

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-rose-950/40 border border-rose-800/60 text-rose-300 rounded-2xl flex items-start gap-3 backdrop-blur-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Input Parameter Error</p>
              <p className="text-sm mt-0.5 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Two-Column Side-by-Side Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Inputs (Spans 5 of 12 columns) */}
          <div className="lg:col-span-5">
            <InputForm
              items={items}
              setItems={setItems}
              capacity={capacity}
              setCapacity={setCapacity}
              onSubmit={handleSubmit}
              onReset={resetForm}
              loading={loading}
            />
          </div>

          {/* Right Panel: Performance Results & Metrics (Spans 7 of 12 columns) */}
          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <EmptyState />
            ) : (
              <div className="space-y-6 animate-fadeIn">
                {/* Benchmark Time Cards */}
                <ResultCards result={result} />

                {/* Selected Items Breakdown Table */}
                <ItemsTable result={result} />

                {/* Algorithmic Speed Comparison Analytics */}
                <PerformanceSummary result={result} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
