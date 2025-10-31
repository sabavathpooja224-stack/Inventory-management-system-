
import React from 'react';
import { View, UserRole } from '../types';
import { ChartBarIcon, DashboardIcon, PackageIcon, UserGroupIcon, UserIcon } from './icons';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, userRole, setUserRole }) => {
  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'Dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { view: 'Inventory', label: 'Inventory', icon: <PackageIcon /> },
    { view: 'Reports', label: 'Reports', icon: <ChartBarIcon /> },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
              InventorySys
            </h1>
            <nav className="hidden md:flex space-x-2">
              {navItems.map(({ view, label, icon }) => (
                <button
                  key={view}
                  onClick={() => setView(view)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    currentView === view
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md pl-8 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value={UserRole.Admin}>Admin</option>
                <option value={UserRole.Staff}>Staff</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                {userRole === UserRole.Admin ? <UserGroupIcon /> : <UserIcon />}
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* Mobile Navigation */}
      <nav className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around p-1">
        {navItems.map(({ view, label, icon }) => (
          <button
            key={view}
            onClick={() => setView(view)}
            className={`flex flex-col items-center w-full p-2 rounded-lg transition-colors duration-150 ${
              currentView === view
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {icon}
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
