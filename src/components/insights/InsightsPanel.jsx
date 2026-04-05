import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { useFinance } from '../../context/FinanceContext';
import { Lightbulb, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

export const InsightsPanel = () => {
  const { transactions, totalIncome, totalExpenses } = useFinance();

  const insights = useMemo(() => {
    const list = [];
    
    // 1. Comparison Insight
    if (totalIncome > 0 || totalExpenses > 0) {
      if (totalIncome > totalExpenses) {
        list.push({
          id: 1,
          icon: TrendingUp,
          title: 'Positive Cash Flow',
          desc: `You've earned $${(totalIncome - totalExpenses).toLocaleString()} more than you spent.`,
          color: 'text-green-600 dark:text-green-400'
        });
      } else if (totalExpenses > totalIncome) {
        list.push({
          id: 1,
          icon: AlertCircle,
          title: 'Negative Cash Flow',
          desc: `Your expenses exceeded your income by $${(totalExpenses - totalIncome).toLocaleString()}.`,
          color: 'text-red-500 dark:text-red-400'
        });
      }
    }

    // 2. Highest Spending Category
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length > 0) {
      const grouped = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
      
      const highestCat = Object.keys(grouped).reduce((a, b) => grouped[a] > grouped[b] ? a : b);
      
      list.push({
        id: 2,
        icon: TrendingDown,
        title: 'Top Expense Category',
        desc: `You spent the most on ${highestCat} ($${grouped[highestCat].toLocaleString()}).`,
        color: 'text-orange-500 dark:text-orange-400'
      });
    }

    // 3. Largest Single Transaction
    if (transactions.length > 0) {
      const largest = transactions.reduce((max, t) => t.amount > max.amount ? t : max, transactions[0]);
      if (largest) {
        list.push({
          id: 3,
          icon: Lightbulb,
          title: 'Largest Transaction',
          desc: `A ${largest.type} of $${largest.amount.toLocaleString()} for ${largest.category}.`,
          color: 'text-blue-500 dark:text-blue-400'
        });
      }
    }

    return list;
  }, [transactions, totalIncome, totalExpenses]);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Insights</h3>
      </div>
      
      {insights.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-neutral-500">Not enough data to calculate insights.</p>
      ) : (
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
               <div key={insight.id} className="flex gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100 dark:bg-neutral-950/50 dark:border-neutral-800/80 items-start transition-colors">
                  <div className={`mt-0.5 ${insight.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">{insight.desc}</p>
                  </div>
               </div>
            )
          })}
        </div>
      )}
    </Card>
  );
};
