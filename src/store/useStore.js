import { create } from 'zustand';
import { initialTransactions } from '../utils/data';

export const useStore = create((set) => ({
  // Role State
  role: 'viewer', 
  setRole: (role) => set({ role }),

  // Theme State (NEW)
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  // Transactions State
  transactions: initialTransactions,
  searchQuery: '',
  typeFilter: 'All', 

  setSearchQuery: (query) => set({ searchQuery: query }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),
  
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: [{ id: Date.now().toString(), ...transaction }, ...state.transactions]
  }))
}));