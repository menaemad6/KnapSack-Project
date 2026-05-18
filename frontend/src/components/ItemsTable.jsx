import React from 'react';
import { Package, Scale, Coins } from 'lucide-react';

export default function ItemsTable({ result }) {
  const capacity = result.capacity;

  const parseSelection = (selectedItems) => {
    if (!selectedItems) return null;
    const keys = Object.keys(selectedItems);
    let totalWeight = 0;
    let totalValue = 0;
    
    const itemsList = keys.map((k) => {
      const id = k.replace("Item number ", "");
      const weight = Number(selectedItems[k].weight) || 0;
      const value = Number(selectedItems[k].value) || 0;
      totalWeight += weight;
      totalValue += value;
      return { id, weight, value };
    });

    // Sort items by ID for readable chronological order
    itemsList.sort((a, b) => Number(a.id) - Number(b.id));

    return {
      list: itemsList,
      totalWeight,
      totalValue,
      count: itemsList.length
    };
  };

  const bfData = parseSelection(result.brute_force?.selected_items);
  const dpData = parseSelection(result.dynamic_programming.selected_items);
  const grData = parseSelection(result.greedy.selected_items);

  const renderAlgoColumn = (title, data, isSkipped = false, highlightColorClass = "text-zinc-400") => {
    return (
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between h-full">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5 mb-3">
            <span className="text-xs font-bold text-zinc-100 font-mono">{title}</span>
            {isSkipped ? (
              <span className="text-[9px] font-bold text-zinc-600 font-mono tracking-wide uppercase bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded">
                Skipped
              </span>
            ) : (
              <span className="text-[9px] font-bold text-emerald-500 font-mono tracking-wide uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                {data?.count} {data?.count === 1 ? 'Item' : 'Items'}
              </span>
            )}
          </div>

          {/* Metrics */}
          {isSkipped ? (
            <div className="text-xs text-zinc-600 font-mono py-4 italic text-center">
              Dataset too large for combinatorics (N &gt; 22).
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-2 flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-zinc-500" />
                <div>
                  <p className="text-[8px] font-bold text-zinc-600 uppercase font-mono">Weight</p>
                  <p className="text-xs font-mono font-bold text-zinc-200">
                    {data?.totalWeight} <span className="text-zinc-600">/ {capacity}</span>
                  </p>
                </div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-2 flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-zinc-500" />
                <div>
                  <p className="text-[8px] font-bold text-zinc-600 uppercase font-mono">Value</p>
                  <p className="text-xs font-mono font-bold text-zinc-200">
                    {data?.totalValue}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Items Chip Grid */}
          {!isSkipped && data && data.list.length > 0 && (
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">Selected Indices</p>
              <div className="flex flex-wrap gap-1.5">
                {data.list.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-[10px] font-mono hover:border-zinc-700 transition-colors"
                  >
                    <span className="font-bold text-zinc-400">#{item.id}</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-400">w:{item.weight}</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-emerald-500 font-bold">v:{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isSkipped && data && data.list.length === 0 && (
            <div className="text-[11px] text-zinc-600 font-mono italic text-center py-4">
              Knapsack capacity is too small to carry any items.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Package className="w-4 h-4 text-zinc-400" />
        <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
          Selected Items Comparison
        </h3>
      </div>
      
      {/* 3-Column Decoupled Comparative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderAlgoColumn("Brute Force", bfData, !bfData)}
        {renderAlgoColumn("Dynamic Programming", dpData)}
        {renderAlgoColumn("Greedy Heuristic", grData)}
      </div>
    </div>
  );
}
