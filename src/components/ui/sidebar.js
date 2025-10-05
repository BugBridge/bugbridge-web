import React from 'react';
import { cn } from '../../lib/utils';

const Sidebar = ({ items, activeItem, onItemClick, className, ...props }) => {
  return (
    <div className={cn(
      "w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 p-6 space-y-2",
      className
    )} {...props}>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-400 text-sm">Manage your security reports</p>
      </div>
      
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group",
              activeItem === item.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            )}
          >
            <div className={cn(
              "p-2 rounded-lg transition-colors duration-200",
              activeItem === item.id
                ? "bg-white/20"
                : "bg-slate-700/50 group-hover:bg-slate-600/50"
            )}>
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium">{item.label}</div>
              {item.description && (
                <div className="text-xs opacity-75">{item.description}</div>
              )}
            </div>
            {item.badge && (
              <span className="px-2 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export { Sidebar };
