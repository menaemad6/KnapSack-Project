import React from 'react';
import { ShieldAlert, Cpu, Zap } from 'lucide-react';

export default function ResultCards({ result }) {
  const bf = result.brute_force;
  const dp = result.dynamic_programming;
  const gr = result.greedy;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Cpu className="w-4 h-4 text-zinc-400" />
        <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
          Algorithm Solving Statistics
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 🔴 Brute Force Card */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs font-bold text-zinc-100 font-mono">Brute Force</h3>
                <p className="text-[9px] text-rose-400 font-bold font-mono uppercase mt-0.5 tracking-wider">O(2^N) Complexity</p>
              </div>
              <span className="text-[8px] font-bold text-zinc-500 font-mono border border-zinc-800 bg-zinc-950 px-2 py-0.5 rounded tracking-wider uppercase">
                Exact Solution
              </span>
            </div>
            
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-2 font-mono">
              Evaluates every single possible combination of items. 100% mathematically optimal, but runs into a severe exponential wall on inputs where N &gt; 22.
            </p>
          </div>

          <div className="mt-5 border-t border-zinc-800/80 pt-3.5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Optimal Profit</span>
              <span className="text-xl font-bold font-mono text-zinc-100">{bf.max_profit !== null ? bf.max_profit : '—'}</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Solver Time</span>
              <span className="font-bold text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850 border-zinc-800">
                {bf.execution_time_ms !== null ? `${bf.execution_time_ms.toFixed(4)} ms` : 'Skipped (N > 22)'}
              </span>
            </div>
          </div>
        </div>

        {/* 🔵 Dynamic Programming Card */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs font-bold text-zinc-100 font-mono">Dynamic Programming</h3>
                <p className="text-[9px] text-blue-400 font-bold font-mono uppercase mt-0.5 tracking-wider">O(N * W) Complexity</p>
              </div>
              <span className="text-[8px] font-bold text-emerald-500/90 font-mono border border-emerald-500/10 bg-emerald-500/5 px-2 py-0.5 rounded tracking-wider uppercase">
                Exact & Optimal
              </span>
            </div>
            
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-2 font-mono">
              Breaks the problem into overlapping subproblems using 2D matrix tabulation. Bypasses duplicate calculations to guarantee optimal profit in quadratic time.
            </p>
          </div>

          <div className="mt-5 border-t border-zinc-800/80 pt-3.5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Optimal Profit</span>
              <span className="text-xl font-bold font-mono text-zinc-100">{dp.max_profit}</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Solver Time</span>
              <span className="font-bold text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                {dp.execution_time_ms.toFixed(4)} ms
              </span>
            </div>
          </div>
        </div>

        {/* 🟢 Greedy Heuristic Card */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs font-bold text-zinc-100 font-mono">Greedy Heuristic</h3>
                <p className="text-[9px] text-emerald-400 font-bold font-mono uppercase mt-0.5 tracking-wider">O(N log N) Complexity</p>
              </div>
              <span className="text-[8px] font-bold text-amber-500/90 font-mono border border-amber-500/10 bg-amber-500/5 px-2 py-0.5 rounded tracking-wider uppercase">
                Approximate
              </span>
            </div>
            
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-2 font-mono">
              Sorts items by value-to-weight density ratio and inserts items greedily. Extremely fast, but does not guarantee the mathematical maximum profit.
            </p>
          </div>

          <div className="mt-5 border-t border-zinc-800/80 pt-3.5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Optimal Profit</span>
              <span className="text-xl font-bold font-mono text-zinc-100">{gr.max_profit}</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Solver Time</span>
              <span className="font-bold text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                {gr.execution_time_ms.toFixed(4)} ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
