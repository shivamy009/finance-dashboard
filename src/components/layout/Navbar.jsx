import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Wallet, ShieldAlert, Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  const { role, setRole, theme, setTheme } = useFinance();

  const scrollToTransactions = () => {
    const el = document.getElementById('transactions-section');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="sticky top-4 z-50 mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="rounded-3xl border border-slate-200/80 bg-white/75 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-[0_14px_34px_rgba(2,6,23,0.55)]">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-2.5 transition-colors dark:border-slate-800 dark:bg-slate-950">
              <Wallet className="h-5 w-5 text-slate-800 dark:text-slate-100" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Control Center</p>
              <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Finance Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button 
              onClick={scrollToTransactions}
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 dark:bg-sky-400 dark:text-slate-900 dark:shadow-[0_10px_24px_rgba(14,165,233,0.35)] dark:hover:bg-sky-300"
            >
              Jump To Ledger
            </button>
            
            <button 
              onClick={toggleTheme}
              className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-950/60">
              <button
                className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${role === 'VIEWER' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`}
                onClick={() => setRole('VIEWER')}
              >
                Viewer
              </button>
              <button
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${role === 'ADMIN' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`}
                onClick={() => setRole('ADMIN')}
              >
                <ShieldAlert className="h-3.5 w-3.5" /> <span className="hidden md:inline">Admin</span>
              </button>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
};
