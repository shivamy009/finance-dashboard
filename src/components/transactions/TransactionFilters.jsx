import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const TransactionFilters = () => {
  const { searchQuery, setSearchQuery, typeFilter, setTypeFilter } = useFinance();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500" />
        <input 
          type="text" 
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-700 transition-all shadow-sm dark:shadow-none"
        />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="w-4 h-4 text-gray-400 dark:text-neutral-500" />
        <div className="relative w-full sm:w-auto">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="appearance-none [color-scheme:light] dark:[color-scheme:dark] cursor-pointer bg-gray-50 border border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-xl text-sm text-gray-900 dark:text-white pl-3 pr-9 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-700 transition-all shadow-sm dark:shadow-none"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-neutral-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
