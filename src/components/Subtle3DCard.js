import React from 'react';
import { cn } from '../lib/utils';

const Subtle3DCard = ({ children, className = "" }) => {
  return (
    <div className={cn(
      "group relative h-full w-full rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-blue-500/[0.05]",
      className
    )} style={{ lineHeight: '1.6' }}>
      <div className="relative z-10 pb-2">
        {children}
      </div>
    </div>
  );
};

export default Subtle3DCard;
