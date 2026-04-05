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
  const { filteredTransactions } = useFinance();

  const { totalBalance, totalIncome, totalExpenses } = React.useMemo(() => {
    let income = 0;
    let expenses = 0;

    filteredTransactions.forEach((t) => {
      if (t.type === 'income') income += t.amount;
      if (t.type === 'expense') expenses += t.amount;
    });

    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
    };
  }, [filteredTransactions]);

  const cards = [
    {
      title: 'Net Position',
      amount: totalBalance,
      icon: DollarSign,
      color: 'text-slate-900 dark:text-white',
      bgType: 'bg-sky-100 dark:bg-sky-400/10'
    },
    {
      title: 'Money In',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgType: 'bg-green-100 dark:bg-green-400/10'
    },
    {
      title: 'Money Out',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'text-rose-500 dark:text-rose-400',
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
          <Card key={i} className="group flex items-center justify-between p-6">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{card.title}</p>
              <h3 className={`text-2xl font-semibold tracking-tight ${card.color}`}>
                <AnimatedNumber value={val} prefix={pfx} />
              </h3>
            </div>
            <div className={`rounded-xl p-3 transition-transform group-hover:scale-110 ${card.bgType}`}>
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
