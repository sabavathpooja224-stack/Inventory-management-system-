
import React, { useState, useEffect } from 'react';
import { Item, UserRole } from '../types';
import { CATEGORIES, SUPPLIERS } from '../constants';

interface ItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Item | Omit<Item, 'id' | 'dateAdded'>) => void;
  itemToEdit: Item | null;
  userRole: UserRole;
}

const ItemForm: React.FC<ItemFormProps> = ({ isOpen, onClose, onSave, itemToEdit, userRole }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[0] || '',
    quantity: '0',
    price: '0.00',
    supplier: SUPPLIERS[0] || '',
  });

  const isEditMode = itemToEdit !== null;
  const isAdmin = userRole === UserRole.Admin;

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: itemToEdit.name,
        category: itemToEdit.category,
        quantity: String(itemToEdit.quantity),
        price: String(itemToEdit.price),
        supplier: itemToEdit.supplier,
      });
    } else {
      setFormData({
        name: '',
        category: CATEGORIES[0] || '',
        quantity: '0',
        price: '0.00',
        supplier: SUPPLIERS[0] || '',
      });
    }
  }, [itemToEdit, isEditMode]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      name: formData.name,
      category: formData.category,
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price),
      supplier: formData.supplier,
    };

    if (isEditMode) {
      onSave({ ...itemToEdit, ...processedData });
    } else {
      onSave(processedData);
    }
  };
  
  const InputField = ({ label, name, value, onChange, type = 'text', disabled = false, children }: any) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {type === 'select' ? (
          <select id={name} name={name} value={value} onChange={onChange} disabled={disabled} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50">
            {children}
          </select>
        ) : (
          <input type={type} id={name} name={name} value={value} onChange={onChange} disabled={disabled} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50" />
        )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
              {isEditMode ? 'Edit Item' : 'Add New Item'}
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <InputField label="Item Name" name="name" value={formData.name} onChange={handleChange} disabled={!isAdmin && isEditMode} />
              </div>
              <InputField label="Category" name="category" value={formData.category} onChange={handleChange} type="select" disabled={!isAdmin && isEditMode}>
                 {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </InputField>
              <InputField label="Supplier" name="supplier" value={formData.supplier} onChange={handleChange} type="select">
                 {SUPPLIERS.map(sup => <option key={sup} value={sup}>{sup}</option>)}
              </InputField>
              <InputField label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} type="number" />
              <InputField label="Price" name="price" value={formData.price} onChange={handleChange} type="number" />
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
              Save
            </button>
            <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
