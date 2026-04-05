import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 dark:border-neutral-800 dark:border-t-white rounded-full animate-spin"></div>
      <p className="text-gray-500 dark:text-neutral-400 font-medium animate-pulse">Fetching financial data...</p>
    </div>
  );
};
