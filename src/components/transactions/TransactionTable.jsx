import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { TransactionFilters } from './TransactionFilters';
import { useFinance } from '../../context/FinanceContext';
import { format, parseISO } from 'date-fns';
import { Plus, Trash2, Edit2, Download, ChevronDown } from 'lucide-react';
import { Modal } from '../ui/Modal';

export const TransactionTable = () => {
  const { filteredTransactions, role, addTransaction, deleteTransaction, updateTransaction, exportData } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        amount: item.amount,
        category: item.category,
        type: item.type,
        date: item.date.split('T')[0]
      });
    } else {
      setEditingItem(null);
      setFormData({
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: new Date(formData.date).toISOString()
    };
    
    if (editingItem) {
      updateTransaction({ ...editingItem, ...payload });
    } else {
      addTransaction(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportData}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl transition-colors"
            title="Export Data"
          >
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
          </button>
          {role === 'ADMIN' && (
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-xl text-sm font-medium shadow-md hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>
      </div>

      <TransactionFilters />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-neutral-800 text-sm font-medium text-gray-500 dark:text-neutral-400">
              <th className="pb-3 px-4 font-medium">Date</th>
              <th className="pb-3 px-4 font-medium">Category</th>
              <th className="pb-3 px-4 font-medium">Type</th>
              <th className="pb-3 px-4 font-medium text-right">Amount</th>
              {role === 'ADMIN' && <th className="pb-3 px-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === 'ADMIN' ? 5 : 4} className="py-8 text-center text-gray-500 dark:text-neutral-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 dark:border-neutral-800/50 hover:bg-gray-50 dark:hover:bg-neutral-800/20 transition-colors">
                  <td className="py-4 px-4 whitespace-nowrap text-gray-600 dark:text-neutral-300">
                    {format(parseISO(t.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{t.category}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider
                      ${t.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-400'}`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className={`py-4 px-4 text-right font-semibold ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  {role === 'ADMIN' && (
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(t)}
                          className="p-1.5 text-gray-400 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-neutral-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Transaction' : 'Add Transaction'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-400 mb-1">Type</label>
            <div className="relative">
              <select 
                className="appearance-none [color-scheme:light] dark:[color-scheme:dark] w-full bg-white border border-gray-300 dark:bg-neutral-950 dark:border-neutral-800 rounded-xl pl-3 pr-10 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-700 cursor-pointer"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-400 mb-1">Category</label>
            <input 
              required
              type="text" 
              className="w-full bg-white border border-gray-300 dark:bg-neutral-950 dark:border-neutral-800 rounded-xl px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-700"
              placeholder="e.g. Groceries"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-400 mb-1">Amount ($)</label>
            <input 
              required
              type="number" 
              step="0.01"
              min="0"
              className="w-full bg-white border border-gray-300 dark:bg-neutral-950 dark:border-neutral-800 rounded-xl px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-700"
              placeholder="0.00"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-400 mb-1">Date</label>
            <input 
              required
              type="date" 
              className="w-full [color-scheme:light] dark:[color-scheme:dark] bg-white border border-gray-300 dark:bg-neutral-950 dark:border-neutral-800 rounded-xl px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-700 cursor-pointer"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded-xl text-sm font-medium shadow hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors"
            >
              {editingItem ? 'Save Changes' : 'Create Transaction'}
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
};
