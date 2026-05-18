import React from 'react';
import { ShieldAlert, Zap, Cpu, Award } from 'lucide-react';

export default function ResultCards({ result }) {
  const bf = result.brute_force;
  const dp = result.dynamic_programming;
  const gr = result.greedy;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 🔴 Brute Force Card */}
      <div className="relative overflow-hidden bg-slate-800/20 border border-slate-700/60 rounded-2xl p-5 shadow-lg group hover:border-rose-500/30 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-300"></div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xs font-extrabold text-rose-400 uppercase tracking-widest">
            Brute Force
          </h3>
          <ShieldAlert className="w-4 h-4 text-rose-500/60" />
        </div>
        <div className="text-3xl font-black text-slate-100 font-mono tracking-tight">
          {bf.max_profit !== null ? bf.max_profit : '—'}
        </div>
        <div className="text-[10px] text-slate-500 mt-4 border-t border-slate-700/40 pt-2 font-mono flex justify-between items-center">
          <span>RUN TIME</span>
          <span className="font-semibold text-rose-400 bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10">
            {bf.execution_time_ms !== null ? `${bf.execution_time_ms.toFixed(4)} ms` : 'Skipped'}
          </span>
        </div>
      </div>

      {/* 🔵 Dynamic Programming Card */}
      <div className="relative overflow-hidden bg-slate-800/20 border border-slate-700/60 rounded-2xl p-5 shadow-lg group hover:border-blue-500/30 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-300"></div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xs font-extrabold text-blue-400 uppercase tracking-widest">
            Dynamic Prog.
          </h3>
          <Award className="w-4 h-4 text-blue-500/60" />
        </div>
        <div className="text-3xl font-black text-slate-100 font-mono tracking-tight">
          {dp.max_profit}
        </div>
        <div className="text-[10px] text-slate-500 mt-4 border-t border-slate-700/40 pt-2 font-mono flex justify-between items-center">
          <span>RUN TIME</span>
          <span className="font-semibold text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
            {dp.execution_time_ms.toFixed(4)} ms
          </span>
        </div>
      </div>

      {/* 🟢 Greedy Heuristic Card */}
      <div className="relative overflow-hidden bg-slate-800/20 border border-slate-700/60 rounded-2xl p-5 shadow-lg group hover:border-emerald-500/30 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-300"></div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
            Greedy Ratio
          </h3>
          <Zap className="w-4 h-4 text-emerald-500/60" />
        </div>
        <div className="text-3xl font-black text-slate-100 font-mono tracking-tight">
          {gr.max_profit}
        </div>
        <div className="text-[10px] text-slate-500 mt-4 border-t border-slate-700/40 pt-2 font-mono flex justify-between items-center">
          <span>RUN TIME</span>
          <span className="font-semibold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
            {gr.execution_time_ms.toFixed(4)} ms
          </span>
        </div>
      </div>
    </div>
  );
}
