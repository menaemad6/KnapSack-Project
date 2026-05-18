import React from 'react';
import { Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-10 border-b border-zinc-800/80 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-zinc-100 shadow-sm">
          <Terminal className="w-5 h-5 stroke-[1.5]" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">
            Knapsack Algorithm Suite
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5 font-medium">
            Core mathematical benchmarks and solver runtime statistics.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 rounded-lg text-[10px] self-start sm:self-center font-mono tracking-wider">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
        <span className="font-bold text-emerald-500 uppercase">API Connected</span>
      </div>
    </header>
  );
}
