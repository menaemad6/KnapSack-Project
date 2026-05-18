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
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-sm backdrop-blur-xs">
      <div className="flex justify-between items-center mb-6 border-b border-zinc-800/60 pb-3">
        <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
          <Sliders className="w-4.5 h-4.5 text-zinc-400" /> Input Parameters
        </h2>
        <button
          type="button"
          onClick={loadDemoData}
          className="text-[10px] text-zinc-400 hover:text-zinc-100 font-mono tracking-wider uppercase border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 rounded transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3 inline mr-1 text-zinc-400" /> Demo Case
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-wider mb-3">
            Item Configuration
          </label>
          <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="bg-zinc-900 border border-zinc-800 text-[10px] font-bold w-6 h-6 rounded flex items-center justify-center text-zinc-400 font-mono">
                  {idx + 1}
                </div>
                <input
                  type="number"
                  placeholder="Weight"
                  required
                  min="1"
                  value={item.weight}
                  onChange={(e) => handleItemChange(idx, 'weight', e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-zinc-500 transition-colors text-zinc-100 placeholder-zinc-700"
                />
                <input
                  type="number"
                  placeholder="Value"
                  required
                  min="1"
                  value={item.value}
                  onChange={(e) => handleItemChange(idx, 'value', e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-zinc-500 transition-colors text-zinc-100 placeholder-zinc-700"
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItemRow(idx)}
                    className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded hover:bg-zinc-800/40 transition-colors cursor-pointer"
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
            className="mt-4 text-[11px] text-zinc-400 font-bold hover:text-zinc-100 flex items-center gap-1 transition-colors cursor-pointer font-mono uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" /> Add Row
          </button>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-wider mb-2">
            Capacity (W)
          </label>
          <input
            type="number"
            placeholder="e.g. 50"
            required
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 w-full text-sm focus:outline-none focus:border-zinc-500 transition-colors text-zinc-100 placeholder-zinc-700"
          />
        </div>

        <div className="flex gap-3 pt-3 border-t border-zinc-800/60">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-800 text-zinc-950 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors uppercase tracking-wider"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> {loading ? 'Solving...' : 'Run Solver'}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-4 py-2.5 rounded-lg text-xs flex items-center justify-center cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
