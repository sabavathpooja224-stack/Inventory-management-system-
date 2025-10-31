
import React, { useState, useCallback } from 'react';
import { Item, UserRole, View } from './types';
import { INITIAL_INVENTORY } from './constants';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InventoryTable from './components/InventoryTable';
import Reports from './components/Reports';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState<Item[]>(INITIAL_INVENTORY);
  const [view, setView] = useState<View>('Dashboard');
  const [role, setRole] = useState<UserRole>(UserRole.Admin);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleAddItem = (item: Omit<Item, 'id' | 'dateAdded'>) => {
    const newItem: Item = {
      ...item,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    };
    setItems(prevItems => [newItem, ...prevItems]);
  };

  const handleUpdateItem = (updatedItem: Item) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const openFormForNew = useCallback(() => {
    setEditingItem(null);
    setIsFormOpen(true);
  }, []);

  const openFormForEdit = useCallback((item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  }, []);

  const handleSaveItem = (itemData: Item | Omit<Item, 'id' | 'dateAdded'>) => {
    if ('id' in itemData) {
      handleUpdateItem(itemData as Item);
    } else {
      handleAddItem(itemData as Omit<Item, 'id' | 'dateAdded'>);
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const renderView = () => {
    switch (view) {
      case 'Inventory':
        return (
          <InventoryTable
            items={items}
            userRole={role}
            onEdit={openFormForEdit}
            onDelete={handleDeleteItem}
            onAddNew={openFormForNew}
          />
        );
      case 'Reports':
        return <Reports items={items} />;
      case 'Dashboard':
      default:
        return <Dashboard items={items} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header currentView={view} setView={setView} userRole={role} setUserRole={setRole} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
      {isFormOpen && (
        <ItemForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
          itemToEdit={editingItem}
          userRole={role}
        />
      )}
    </div>
  );
}

export default App;
