import React from 'react';
import { Navbar } from './Navbar';

export const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-sky-200/60 dark:selection:bg-sky-500/30">
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(1200px_500px_at_-10%_-20%,rgba(14,165,233,0.15),transparent_70%),radial-gradient(900px_400px_at_110%_0%,rgba(20,184,166,0.12),transparent_70%)] dark:bg-[radial-gradient(900px_450px_at_0%_-10%,rgba(14,165,233,0.12),transparent_65%),radial-gradient(1000px_500px_at_100%_0%,rgba(20,184,166,0.1),transparent_70%)]" />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-7xl space-y-6 px-4 pb-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};
