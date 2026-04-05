import React, { useEffect } from 'react';
import { Card } from '../ui/Card';
import { useFinance } from '../../context/FinanceContext';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber = ({ value, prefix }) => {
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (current) => 
    prefix + current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

export const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: DollarSign,
      color: 'text-gray-900 dark:text-white',
      bgType: 'bg-gray-100 dark:bg-neutral-800'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgType: 'bg-green-100 dark:bg-green-400/10'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'text-red-500 dark:text-red-400',
      bgType: 'bg-red-50 dark:bg-red-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const val = Math.abs(Number(card.amount) || 0);
        const pfx = (Number(card.amount) || 0) < 0 ? "-$" : "$";
        return (
          <Card key={i} className="p-6 flex items-center justify-between group">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-neutral-400 mb-1">{card.title}</p>
              <h3 className={`text-2xl font-semibold tracking-tight ${card.color}`}>
                <AnimatedNumber value={val} prefix={pfx} />
              </h3>
            </div>
            <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${card.bgType}`}>
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
