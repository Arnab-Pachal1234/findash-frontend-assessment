import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Wallet, Shield, LayoutDashboard, ListOrdered, Menu, X, Moon, Sun } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function AppLayout() {
  const { role, setRole, theme, toggleTheme } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">
      
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#333',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
          }
        }} 
      />

      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                <Wallet size={24} />
                <span>FinDash</span>
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                <NavLink to="/" className={({ isActive }) => 
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-400' 
                             : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }>
                  <LayoutDashboard size={18} />
                  Overview
                </NavLink>
                <NavLink to="/transactions" className={({ isActive }) => 
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-400' 
                             : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }>
                  <ListOrdered size={18} />
                  Transactions
                </NavLink>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              
              {/* NEW: Dark Mode Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1.5 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
                <Shield size={16} className={`ml-1 ${role === 'admin' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-200 outline-none cursor-pointer pr-1"
                >
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-400' 
                           : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }>
                <LayoutDashboard size={20} />
                Overview
              </NavLink>
              <NavLink to="/transactions" onClick={closeMobileMenu} className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-400' 
                           : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }>
                <ListOrdered size={20} />
                Transactions
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet /> 
      </main>
      
    </div>
  );
}