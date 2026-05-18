import React from 'react';
import { Gauge, Info, BookOpen, AlertCircle } from 'lucide-react';

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
          detail: 'Tabulation reduces exponential decision branches into a fast grid lookup.'
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
    <div className="bg-zinc-900/10 border border-zinc-800 rounded-xl p-6 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2.5">
        <Gauge className="w-4.5 h-4.5 text-zinc-400" />
        <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
          Performance Diagnostics & Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Calculated Ratios & Metrics (Spans 7 of 12) */}
        <div className="lg:col-span-7 space-y-3.5">
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Comparative Speed Ratios</p>
          {speedups.length > 0 ? (
            speedups.map((speedup, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/40 border border-zinc-800/80 p-3.5 rounded-lg flex items-start gap-3 hover:bg-zinc-900/60 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-bold text-zinc-200 font-mono tracking-tight">{speedup.text}</p>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed flex items-center gap-1 font-mono">
                    <Info className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" /> {speedup.detail}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[11px] text-zinc-600 font-mono italic">No comparative speed metrics available for these sizes.</p>
          )}
        </div>

        {/* Right Side: Scientific Takeaways & Units Legend (Spans 5 of 12) */}
        <div className="lg:col-span-5 bg-zinc-950/40 border border-zinc-800/80 rounded-lg p-4 space-y-4">
          {/* Unit Legend */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono">Benchmark Legend</p>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-mono">
              Solver times are measured in **milliseconds (ms)**:
              <br />
              <span className="text-zinc-400 font-bold">• 1.0 ms = 1/1,000 second</span>
              <br />
              <span className="text-zinc-400 font-bold">• 0.001 ms = 1 microsecond</span>
            </p>
          </div>

          {/* Diagnostic Recommendation */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono">Key Architectural Takeaway</p>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-mono">
              Use **Dynamic Programming (DP)** as the default for exact solutions. It scales quadratically, keeping outputs under <span className="text-emerald-500 font-bold">1ms</span> for average sizes.
              Use **Greedy** when absolute speed is critical on massive sets and minor approximation errors are acceptable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
