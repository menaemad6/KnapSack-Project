import React from 'react';
import { PackageOpen } from 'lucide-react';

export default function ItemsTable({ result }) {
  const bfSelected = result.brute_force?.selected_items;
  const dpSelected = result.dynamic_programming.selected_items;
  const grSelected = result.greedy.selected_items;

  const formatSelection = (selected) => {
    if (!selected) return <span className="text-slate-500 italic">Skipped (Input too large)</span>;
    const keys = Object.keys(selected);
    if (keys.length === 0) return <span className="text-slate-500 italic">None selected</span>;
    return (
      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
        {keys.map((k) => {
          const itemNum = k.replace("Item number ", "");
          const val = selected[k].value;
          const wt = selected[k].weight;
          return (
            <span
              key={k}
              title={`Value: ${val}, Weight: ${wt}`}
              className="px-2 py-0.5 bg-slate-800 border border-slate-700/60 rounded-md text-[10px] font-mono text-slate-300 hover:border-slate-500 transition-colors"
            >
              #{itemNum} <span className="text-slate-500">(v:{val}, w:{wt})</span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-800/30 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2 border-b border-slate-700/30 pb-2.5">
        <PackageOpen className="w-4.5 h-4.5 text-indigo-400" /> Selected Items Breakdown
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-700/60 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              <th className="py-2.5 w-1/3">Algorithm</th>
              <th className="py-2.5 w-2/3">Chosen Combinations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr>
              <td className="py-3.5 font-bold text-rose-400">Brute Force</td>
              <td className="py-3.5">{formatSelection(bfSelected)}</td>
            </tr>
            <tr>
              <td className="py-3.5 font-bold text-blue-400">Dynamic Programming</td>
              <td className="py-3.5">{formatSelection(dpSelected)}</td>
            </tr>
            <tr>
              <td className="py-3.5 font-bold text-emerald-400">Greedy Heuristic</td>
              <td className="py-3.5">{formatSelection(grSelected)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
