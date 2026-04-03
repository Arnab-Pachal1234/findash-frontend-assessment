import React, { useMemo, useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useDebounce } from '../hooks/useDebounce';
import { formatCurrency } from '../utils/data';
import { Search, Filter, Trash2, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import TransactionModal from '../components/TransactionModal';
export default function Transactions() {
  const { transactions, searchQuery, typeFilter, role, setSearchQuery, setTypeFilter, deleteTransaction } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, typeFilter]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                            t.category.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesType = typeFilter === 'All' || t.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [transactions, debouncedSearch, typeFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    deleteTransaction(id);
    toast.success('Transaction deleted');
    
    if (paginatedTransactions.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mt-8 relative transition-colors duration-200">
      
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Transactions</h2>
          {role === 'admin' && (
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md flex items-center gap-1 transition-colors">
              <Plus size={16} /> New
            </button>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>
          <div className="relative flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white transition-colors"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider transition-colors">
              <th className="p-4 font-medium whitespace-nowrap">Date</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium text-right whitespace-nowrap">Amount</th>
              {role === 'admin' && <th className="p-4 font-medium text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm transition-colors">
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 5 : 4} className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{tx.date}</td>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">{tx.name}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`p-4 text-right font-medium whitespace-nowrap ${tx.type === 'Income' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                    {tx.type === 'Income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  {role === 'admin' && (
                    <td className="p-4 text-center">
                      <button onClick={() => handleDelete(tx.id)} className="text-red-400 hover:text-red-600 dark:hover:text-red-300 p-1 rounded transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {isModalOpen && <TransactionModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

