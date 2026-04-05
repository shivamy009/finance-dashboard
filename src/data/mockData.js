import { subDays } from 'date-fns';

export const initialTransactions = [
  {
    id: '1',
    date: subDays(new Date(), 1).toISOString(),
    amount: 94.75,
    category: 'Supermarket',
    type: 'expense'
  },
  {
    id: '2',
    date: subDays(new Date(), 3).toISOString(),
    amount: 4100,
    category: 'Monthly Salary',
    type: 'income'
  },
  {
    id: '3',
    date: subDays(new Date(), 4).toISOString(),
    amount: 32.4,
    category: 'Coffee & Snacks',
    type: 'expense'
  },
  {
    id: '4',
    date: subDays(new Date(), 6).toISOString(),
    amount: 210,
    category: 'Electric Bill',
    type: 'expense'
  },
  {
    id: '5',
    date: subDays(new Date(), 8).toISOString(),
    amount: 18.99,
    category: 'Streaming',
    type: 'expense'
  },
  {
    id: '6',
    date: subDays(new Date(), 10).toISOString(),
    amount: 760,
    category: 'Consulting',
    type: 'income'
  },
  {
    id: '7',
    date: subDays(new Date(), 12).toISOString(),
    amount: 145.3,
    category: 'Dining Out',
    type: 'expense'
  },
  {
    id: '8',
    date: subDays(new Date(), 15).toISOString(),
    amount: 420,
    category: 'Tax Refund',
    type: 'income'
  },
  {
    id: '9',
    date: subDays(new Date(), 18).toISOString(),
    amount: 68,
    category: 'Commute',
    type: 'expense'
  },
  {
    id: '10',
    date: subDays(new Date(), 21).toISOString(),
    amount: 1750,
    category: 'House Rent',
    type: 'expense'
  },
  {
    id: '11',
    date: subDays(new Date(), 23).toISOString(),
    amount: 89,
    category: 'Mobile & Internet',
    type: 'expense'
  },
  {
    id: '12',
    date: subDays(new Date(), 27).toISOString(),
    amount: 300,
    category: 'Investment Dividend',
    type: 'income'
  },
  {
    id: '13',
    date: subDays(new Date(), 29).toISOString(),
    amount: 56.2,
    category: 'Fuel',
    type: 'expense'
  },
  {
    id: '14',
    date: subDays(new Date(), 31).toISOString(),
    amount: 125,
    category: 'Gym Membership',
    type: 'expense'
  },
  {
    id: '15',
    date: subDays(new Date(), 34).toISOString(),
    amount: 980,
    category: 'Freelance Project',
    type: 'income'
  },
  {
    id: '16',
    date: subDays(new Date(), 36).toISOString(),
    amount: 72.45,
    category: 'Pharmacy',
    type: 'expense'
  },
  {
    id: '17',
    date: subDays(new Date(), 39).toISOString(),
    amount: 240,
    category: 'Online Course',
    type: 'expense'
  },
  {
    id: '18',
    date: subDays(new Date(), 42).toISOString(),
    amount: 515,
    category: 'Side Hustle',
    type: 'income'
  },
  {
    id: '19',
    date: subDays(new Date(), 45).toISOString(),
    amount: 39.99,
    category: 'Cloud Storage',
    type: 'expense'
  },
  {
    id: '20',
    date: subDays(new Date(), 48).toISOString(),
    amount: 88,
    category: 'Books',
    type: 'expense'
  }
];
