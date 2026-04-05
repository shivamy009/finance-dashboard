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
    <div className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <nav className="border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/40 transition-colors duration-300">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-black rounded-full border border-gray-200 dark:border-neutral-800 transition-colors">
              <Wallet className="w-5 h-5 text-gray-800 dark:text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white text-lg tracking-tight hidden sm:block">Finance</span>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Glowy Button */}
            <button 
              onClick={scrollToTransactions}
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black text-sm font-bold shadow-[0_0_15px_rgba(0,0,0,0.15)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Recent Transactions
            </button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 rounded-full transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center bg-gray-100 dark:bg-black/50 rounded-full p-1 border border-gray-200 dark:border-neutral-800 transition-colors">
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${role === 'VIEWER' ? 'bg-white text-gray-900 shadow-sm dark:bg-neutral-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white'}`}
                onClick={() => setRole('VIEWER')}
              >
                Viewer
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 ${role === 'ADMIN' ? 'bg-white text-gray-900 shadow-sm dark:bg-neutral-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white'}`}
                onClick={() => setRole('ADMIN')}
              >
                <ShieldAlert className="w-3.5 h-3.5" /> <span className="hidden md:inline">Admin</span>
              </button>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
};
