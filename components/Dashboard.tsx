
import React from 'react';
import { Item } from '../types';
import { AlertTriangleIcon, DollarSignIcon, PackageIcon } from './icons';

interface DashboardProps {
  items: Item[];
}

const Dashboard: React.FC<DashboardProps> = ({ items }) => {
  const totalItems = items.length;
  const totalStockValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lowStockItems = items.filter(item => item.quantity < 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string | number, color: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-start space-x-4">
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={<PackageIcon className="text-white"/>} 
          title="Total Products" 
          value={totalItems} 
          color="bg-primary-500"
        />
        <StatCard 
          icon={<DollarSignIcon className="text-white"/>} 
          title="Total Stock Value" 
          value={formatCurrency(totalStockValue)} 
          color="bg-green-500"
        />
        <StatCard 
          icon={<AlertTriangleIcon className="text-white"/>} 
          title="Low Stock Items" 
          value={lowStockItems.length}
          color={lowStockItems.length > 0 ? "bg-red-500" : "bg-yellow-500"}
        />
      </div>

      {lowStockItems.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center">
            <AlertTriangleIcon className="mr-2"/> Low Stock Alerts
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
            These items have a quantity of less than 5. Consider reordering soon.
          </p>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {lowStockItems.map(item => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Supplier: {item.supplier}</p>
                </div>
                <span className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {item.quantity} units left
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
