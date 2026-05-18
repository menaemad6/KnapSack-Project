import React from 'react';
import { Gauge, Info } from 'lucide-react';

export default function PerformanceSummary({ result }) {
  const getSpeedups = () => {
    if (!result) return [];
    const bf = result.brute_force?.execution_time_ms;
    const dp = result.dynamic_programming.execution_time_ms;
    const gr = result.greedy.execution_time_ms;

    const list = [];
    if (bf && dp && dp > 0) {
      const ratio = bf / dp;
      if (ratio > 1) {
        list.push({
          type: 'bf-dp',
          text: `Dynamic Programming is ${ratio.toFixed(1)}x faster than Brute Force.`,
          detail: 'Tabulation reduces exponential decision branches into a quick grid lookup.'
        });
      } else {
        list.push({
          type: 'bf-dp',
          text: `Brute Force is ${(1 / ratio).toFixed(1)}x faster than Dynamic Programming.`,
          detail: 'At tiny N, recursion stack setup can sometimes edge out memory allocation overhead.'
        });
      }
    }
    
    if (dp && gr && gr > 0) {
      const ratio = dp / gr;
      if (ratio > 1) {
        list.push({
          type: 'dp-gr',
          text: `Greedy Heuristic is ${ratio.toFixed(1)}x faster than Dynamic Programming.`,
          detail: 'Sorting value/weight ratios is a local decision scan, avoiding massive matrix storage.'
        });
      } else {
        list.push({
          type: 'dp-gr',
          text: `Dynamic Programming is ${(1 / ratio).toFixed(1)}x faster than Greedy Heuristic.`,
          detail: 'Extremely dense or nested sorting loops can sometimes bottleneck greedy scans.'
        });
      }
    }

    if (bf && gr && gr > 0) {
      const ratio = bf / gr;
      if (ratio > 1) {
        list.push({
          type: 'bf-gr',
          text: `Greedy Heuristic is ${ratio.toFixed(1)}x faster than Brute Force.`,
          detail: 'Bypasses combinatorial exploration, giving results in microsecond bounds.'
        });
      }
    }

    return list;
  };

  const speedups = getSpeedups();

  return (
    <div className="bg-indigo-950/10 border border-indigo-900/30 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-12 -mt-12"></div>
      <h3 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2 border-b border-indigo-900/20 pb-2.5">
        <Gauge className="w-4.5 h-4.5" /> Performance Analytics Summary
      </h3>
      <div className="space-y-4">
        {speedups.length > 0 ? (
          speedups.map((speedup, idx) => (
            <div
              key={idx}
              className="bg-indigo-950/20 border border-indigo-900/20 p-3.5 rounded-xl flex items-start gap-3 hover:bg-indigo-950/30 transition-all duration-300"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0 animate-pulse"></div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{speedup.text}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" /> {speedup.detail}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-500 italic">No comparative speed metrics available for these sizes.</p>
        )}
      </div>
    </div>
  );
}
