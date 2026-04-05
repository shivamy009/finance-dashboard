import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "group relative z-10 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 backdrop-blur-sm transition-all duration-500 will-change-transform dark:border-slate-800/70 dark:bg-slate-900/85",
        "shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:shadow-[0_14px_34px_rgba(2,6,23,0.35)]",
        "hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(15,23,42,0.09)] dark:hover:shadow-[0_18px_40px_rgba(2,6,23,0.55)]",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent opacity-40" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.14),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(20,184,166,0.12),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(20,184,166,0.16),transparent_40%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_40%,rgba(255,255,255,0.45)_50%,transparent_60%,transparent_100%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:bg-[linear-gradient(120deg,transparent_0%,transparent_40%,rgba(255,255,255,0.12)_50%,transparent_60%,transparent_100%)]" />
      </div>

      {children}
    </div>
  );
};
