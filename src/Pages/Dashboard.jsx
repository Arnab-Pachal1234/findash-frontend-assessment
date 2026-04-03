import React from 'react';
import { useStore } from '../store/useStore';
import { useFinancialMetrics } from '../hooks/useFinancilalMetrics';
import { formatCurrency } from '../utils/data';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Lightbulb } from 'lucide-react';
import Card from "../components/Card"; 

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'];

export default function Dashboard() {

  const transactions = useStore((state) => state.transactions);
  const theme = useStore((state) => state.theme); 
  
  const { 
    income, 
    expenses, 
    balance, 
    pieData, 
    trendData, 
    topExpense 
  } = useFinancialMetrics(transactions);

  const chartAxisColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
    color: theme === 'dark' ? '#f3f4f6' : '#111827',
    borderRadius: '8px', 
    border: 'none', 
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
  };

  return (
    <div className="space-y-6">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          title="Total Balance" 
          amount={balance} 
          icon={<DollarSign className="text-blue-500 dark:text-blue-400" />} 
        />
        <Card 
          title="Total Income" 
          amount={income} 
          icon={<TrendingUp className="text-green-500 dark:text-green-400" />} 
        />
        <Card 
          title="Total Expenses" 
          amount={expenses} 
          icon={<TrendingDown className="text-red-500 dark:text-red-400" />} 
        />
      </div>

      {topExpense && (
        <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 p-4 rounded-lg flex items-start gap-3 transition-colors duration-200">
          <Lightbulb className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-1" size={20} />
          <div>
            <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">Financial Insight</h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
              Your highest spending category currently is <strong>{topExpense.name}</strong> at {formatCurrency(topExpense.value)}.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Balance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="date" 
                  stroke={chartAxisColor} 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke={chartAxisColor} 
                  fontSize={12} 
                  tickFormatter={(val) => `$${val}`} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={tooltipStyle}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2 }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Expenses by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                  stroke={theme === 'dark' ? '#1f2937' : '#ffffff'} 
                  strokeWidth={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value)} 
                  contentStyle={tooltipStyle}
                />
                <Legend 
                  iconType="circle" 
                  wrapperStyle={{ fontSize: '12px', color: chartAxisColor }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}