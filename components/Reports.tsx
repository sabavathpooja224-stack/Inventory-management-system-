
import React, { useMemo } from 'react';
import { Item } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsProps {
  items: Item[];
}

const Reports: React.FC<ReportsProps> = ({ items }) => {
  const totalStockValue = useMemo(() => 
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  
  const mostStockedItems = useMemo(() => 
    [...items].sort((a, b) => b.quantity - a.quantity).slice(0, 5),
    [items]
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600 rounded shadow-lg">
          <p className="label font-bold">{`${label}`}</p>
          <p className="text-primary-500">{`Quantity: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reports</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Summary</h3>
        <p className="mt-2 text-3xl font-bold text-primary-600 dark:text-primary-400">{formatCurrency(totalStockValue)}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Total Inventory Value</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top 5 Most Stocked Items</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={mostStockedItems}
              margin={{
                top: 5, right: 20, left: -10, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} />
              <Legend />
              <Bar dataKey="quantity" fill="#3b82f6" name="Quantity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
