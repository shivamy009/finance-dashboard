import { subDays } from 'date-fns';

export const initialTransactions = [
  {
    id: '1',
    date: subDays(new Date(), 1).toISOString(),
    amount: 120.5,
    category: 'Groceries',
    type: 'expense'
  },
  {
    id: '2',
    date: subDays(new Date(), 2).toISOString(),
    amount: 3200,
    category: 'Salary',
    type: 'income'
  },
  {
    id: '3',
    date: subDays(new Date(), 4).toISOString(),
    amount: 50.0,
    category: 'Entertainment',
    type: 'expense'
  },
  {
    id: '4',
    date: subDays(new Date(), 5).toISOString(),
    amount: 85.2,
    category: 'Utilities',
    type: 'expense'
  },
  {
    id: '5',
    date: subDays(new Date(), 10).toISOString(),
    amount: 15.0,
    category: 'Subscriptions',
    type: 'expense'
  },
  {
    id: '6',
    date: subDays(new Date(), 12).toISOString(),
    amount: 500,
    category: 'Freelance',
    type: 'income'
  },
  {
    id: '7',
    date: subDays(new Date(), 15).toISOString(),
    amount: 250,
    category: 'Dining',
    type: 'expense'
  },
  {
    id: '8',
    date: subDays(new Date(), 18).toISOString(),
    amount: 1000,
    category: 'Bonus',
    type: 'income'
  },
  {
    id: '9',
    date: subDays(new Date(), 20).toISOString(),
    amount: 120,
    category: 'Transport',
    type: 'expense'
  },
  {
    id: '10',
    date: subDays(new Date(), 25).toISOString(),
    amount: 1500,
    category: 'Rent',
    type: 'expense'
  }
];
