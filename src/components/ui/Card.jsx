import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl transition-all duration-500 will-change-transform z-10",
        "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black/80 backdrop-blur-sm",
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.03)]",
        "hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Background Graphic Effects Container (Isolated layout) */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
        </div>
        <div className="absolute inset-0 p-px bg-gradient-to-br from-transparent via-gray-100/70 to-transparent dark:via-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-gray-50/50 to-transparent dark:from-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Children flow transparently */}
      {children}
    </div>
  );
};
