import React from 'react';
import { Terminal } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="border border-dashed border-zinc-800 rounded-xl h-[450px] flex flex-col items-center justify-center text-zinc-500 p-8 text-center bg-zinc-900/10">
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-zinc-600 mb-4 shadow-sm">
        <Terminal className="w-8 h-8 stroke-[1.2]" />
      </div>
      <h3 className="font-bold text-zinc-300 text-sm tracking-tight">
        Awaiting Parameters
      </h3>
      <p className="text-xs text-zinc-500 max-w-xs mt-2 leading-relaxed font-medium">
        Enter item details in the left panel and click "Run Solver" to execute and inspect relative execution performance statistics.
      </p>
    </div>
  );
}
