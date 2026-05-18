import React from 'react';
import { Layers } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-8 border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600/10 border border-indigo-500/20 p-2.5 rounded-xl text-indigo-400">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            Knapsack Algorithm Suite
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-medium">
            Comparative Performance Analysis & Solver Dashboard
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs self-start sm:self-center backdrop-blur-sm shadow-sm">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
        <span className="w-2 h-2 bg-emerald-500 rounded-full -ml-4"></span>
        <span className="font-semibold text-emerald-400 font-mono uppercase tracking-wider">Web API Online</span>
      </div>
    </header>
  );
}
