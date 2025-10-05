import React from 'react';
import { cn } from '../../lib/utils';

const StatCard = ({ title, value, change, icon, trend, className, ...props }) => {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10",
      className
    )} {...props}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            {icon}
          </div>
          {trend && (
            <div className={cn(
              "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold",
              trend === 'up' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            )}>
              <span>{trend === 'up' ? '↗' : '↘'}</span>
              <span>{change}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          <p className="text-slate-400 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

export { StatCard };
