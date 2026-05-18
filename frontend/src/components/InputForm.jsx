import React from 'react';
import { Play, RotateCcw, Plus, Trash2, Sliders, Sparkles } from 'lucide-react';

export default function InputForm({
  items,
  setItems,
  capacity,
  setCapacity,
  onSubmit,
  onReset,
  loading
}) {
  const addItemRow = () => setItems([...items, { weight: '', value: '' }]);
  const removeItemRow = (idx) => setItems(items.filter((_, i) => i !== idx));

  const handleItemChange = (idx, field, val) => {
    const updated = [...items];
    updated[idx][field] = val;
    setItems(updated);
  };

  const loadDemoData = () => {
    setItems([
      { weight: '2', value: '3' },
      { weight: '3', value: '4' },
      { weight: '4', value: '5' },
      { weight: '5', value: '6' }
    ]);
    setCapacity('5');
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700/60 pb-3">
        <h2 className="text-base font-bold text-indigo-400 flex items-center gap-2">
          <Sliders className="w-5 h-5" /> Problem Parameters
        </h2>
        <button
          type="button"
          onClick={loadDemoData}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg"
        >
          <Sparkles className="w-3.5 h-3.5" /> Demo Data
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Items Configuration (Weight & Value)
          </label>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="bg-slate-700/60 border border-slate-600/50 text-[10px] font-bold w-6 h-6 rounded-lg flex items-center justify-center text-slate-300">
                  {idx + 1}
                </div>
                <input
                  type="number"
                  placeholder="Weight"
                  required
                  min="1"
                  value={item.weight}
                  onChange={(e) => handleItemChange(idx, 'weight', e.target.value)}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 w-full text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 transition-all text-slate-100 placeholder-slate-600"
                />
                <input
                  type="number"
                  placeholder="Value"
                  required
                  min="1"
                  value={item.value}
                  onChange={(e) => handleItemChange(idx, 'value', e.target.value)}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 w-full text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 transition-all text-slate-100 placeholder-slate-600"
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItemRow(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addItemRow}
            className="mt-4 text-xs text-indigo-400 font-semibold hover:text-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Item
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Knapsack Weight Capacity
          </label>
          <input
            type="number"
            placeholder="e.g. 50"
            required
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 w-full text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 transition-all text-slate-100 placeholder-slate-600"
          />
        </div>

        <div className="flex gap-3 pt-2 border-t border-slate-700/60">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" /> {loading ? 'Computing...' : 'Solve Problem'}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="bg-slate-700/60 border border-slate-600/40 hover:bg-slate-600 hover:text-slate-100 text-slate-300 px-4 py-2.5 rounded-xl text-sm flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
