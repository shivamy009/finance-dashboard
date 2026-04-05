import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { useFinance } from '../../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4'];

export const CategoryChart = () => {
  const { transactions, theme } = useFinance();

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    return Object.keys(grouped).map(key => ({
      name: key,
      value: grouped[key]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (data.length === 0) return null;

  return (
    <Card className="p-6 h-[350px] flex flex-col">
      <h3 className="text-sm font-medium text-gray-500 dark:text-neutral-400 mb-4">Spending by Category</h3>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#171717' : '#ffffff', 
                borderColor: theme === 'dark' ? '#262626' : '#e5e7eb', 
                borderRadius: '8px',
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}
              itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
              formatter={(value) => `$${value}`}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: theme === 'dark' ? '#ffffff' : '#4b5563' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
