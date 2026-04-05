import React from 'react';
import { Navbar } from './Navbar';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-neutral-950 dark:text-white selection:bg-neutral-300 dark:selection:bg-neutral-800 pt-2 pb-8 transition-colors duration-300">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {children}
      </main>
    </div>
  );
};
