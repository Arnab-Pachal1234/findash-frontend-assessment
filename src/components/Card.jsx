import React from 'react';
import { formatCurrency } from '../utils/data'; 

export default function Card({ title, amount, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-900/50">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 transition-colors">
          {formatCurrency(amount)}
        </h3>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-full transition-colors">
        {icon}
      </div>
    </div>
  );
}