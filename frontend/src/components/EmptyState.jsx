import React from 'react';
import { AreaChart, Sparkles } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="border-2 border-dashed border-slate-800/80 rounded-2xl h-[450px] flex flex-col items-center justify-center text-slate-500 p-8 text-center bg-slate-900/10 backdrop-blur-xs">
      <div className="bg-slate-800/40 border border-slate-700/40 p-4 rounded-full text-slate-700 mb-4 animate-pulse">
        <AreaChart className="w-12 h-12 stroke-1" />
      </div>
      <h3 className="font-bold text-slate-300 text-lg flex items-center gap-1.5 justify-center">
        No Computation Data <Sparkles className="w-4 h-4 text-indigo-400" />
      </h3>
      <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
        Set your weight and value parameters in the input panel and click "Solve" to see real-time algorithmic solving breakdowns and performance scaling analysis.
      </p>
    </div>
  );
}
