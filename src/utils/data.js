export const initialTransactions = [
  { id: '1', date: '2026-04-01', amount: 3500, category: 'Salary', type: 'Income', name: 'Tech Corp Inc.' },
  { id: '2', date: '2026-04-02', amount: 1200, category: 'Housing', type: 'Expense', name: 'Rent' },
  { id: '3', date: '2026-04-03', amount: 85, category: 'Food', type: 'Expense', name: 'Groceries' },
  { id: '4', date: '2026-04-05', amount: 120, category: 'Utilities', type: 'Expense', name: 'Electric Bill' },
  { id: '5', date: '2026-04-08', amount: 250, category: 'Food', type: 'Expense', name: 'Dining Out' },
  { id: '6', date: '2026-04-10', amount: 50, category: 'Subscriptions', type: 'Expense', name: 'Streaming Services' },
];

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount);
};