import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { useFinance } from '../../context/FinanceContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

export const BalanceChart = () => {
  const { transactions, theme } = useFinance();

  const data = useMemo(() => {
    // Group transactions by date
    const grouped = transactions.reduce((acc, t) => {
      const dateStr = format(parseISO(t.date), 'MMM dd');
      if (!acc[dateStr]) {
        acc[dateStr] = { date: dateStr, income: 0, expense: 0, balance: 0 };
      }
      if (t.type === 'income') acc[dateStr].income += t.amount;
      if (t.type === 'expense') acc[dateStr].expense += t.amount;
      return acc;
    }, {});

    const sortedData = Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate running balance based on current items
    let currentBalance = 0;
    return sortedData.map(d => {
      currentBalance += (d.income - d.expense);
      return { ...d, balance: currentBalance };
    });
  }, [transactions]);

  if (transactions.length === 0) return null;

  return (
    <Card className="p-6 h-[350px] flex flex-col">
      <h3 className="text-sm font-medium text-gray-500 dark:text-neutral-400 mb-4">Balance Trend</h3>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#262626' : '#e5e7eb'} vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke={theme === 'dark' ? '#737373' : '#a3a3a3'} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke={theme === 'dark' ? '#737373' : '#a3a3a3'} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#171717' : '#ffffff', 
                borderColor: theme === 'dark' ? '#262626' : '#e5e7eb', 
                borderRadius: '8px',
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}
              itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: '#3b82f6', stroke: theme === 'dark' ? '#171717' : '#ffffff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
