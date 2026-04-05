import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => {
  return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false); 
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); 
  const [role, setRole] = useState('VIEWER'); 

  // Theme state strictly defaults to dark
  const [theme, setTheme] = useState('dark');

  // Sync theme to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // INITIAL LOAD: Simulate Mock API Network Request
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      // Simulate 1.2 second network latency
      await new Promise(resolve => setTimeout(resolve, 1200));

      const saved = localStorage.getItem('finance_transactions');
      if (saved) {
        try {
          setTransactions(JSON.parse(saved));
        } catch (err) {
          console.error("Failed to parse transactions from local storage", err);
          setTransactions(initialTransactions);
        }
      } else {
        setTransactions(initialTransactions);
      }
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  // Save to localeStorage whenever transactions change, but don't overwrite during initial load
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('finance_transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  // Derived filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      return matchesSearch && matchesType;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
  }, [transactions, searchQuery, typeFilter]);

  // Derived metrics
  const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      if (t.type === 'expense') expenses += t.amount;
    });
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses
    };
  }, [transactions]);

  // Actions wrapped in Mock API latency
  const mockApiMutation = async (action) => {
    setIsMutating(true);
    // Simulate 600ms latency for mutations
    await new Promise(resolve => setTimeout(resolve, 600));
    action();
    setIsMutating(false);
  };

  const addTransaction = (transaction) => {
    mockApiMutation(() => {
      setTransactions(prev => [{...transaction, id: Date.now().toString()}, ...prev]);
    });
  };

  const updateTransaction = (updated) => {
    mockApiMutation(() => {
      setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
    });
  };

  const deleteTransaction = (id) => {
    mockApiMutation(() => {
      setTransactions(prev => prev.filter(t => t.id !== id));
    });
  };

  const exportData = () => {
    const jsonString = JSON.stringify(transactions, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'finance_transactions_export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const value = {
    transactions,
    filteredTransactions,
    searchQuery, setSearchQuery,
    typeFilter, setTypeFilter,
    role, setRole,
    theme, setTheme,
    isLoading, isMutating,
    totalBalance, totalIncome, totalExpenses,
    addTransaction, updateTransaction, deleteTransaction,
    exportData
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
