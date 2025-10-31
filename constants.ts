
import { Item } from './types';

export const INITIAL_INVENTORY: Item[] = [
  {
    id: 'a1b2c3d4',
    name: 'Eco-friendly Water Bottle',
    category: 'Kitchenware',
    quantity: 150,
    price: 15.99,
    supplier: 'Green Essentials',
    dateAdded: '2023-10-01T10:00:00Z',
  },
  {
    id: 'e5f6g7h8',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    quantity: 80,
    price: 79.99,
    supplier: 'SoundWave Tech',
    dateAdded: '2023-10-05T14:30:00Z',
  },
  {
    id: 'i9j0k1l2',
    name: 'Organic Cotton T-Shirt',
    category: 'Apparel',
    quantity: 200,
    price: 25.0,
    supplier: 'Pure Threads',
    dateAdded: '2023-09-20T09:00:00Z',
  },
  {
    id: 'm3n4o5p6',
    name: 'Smart Fitness Tracker',
    category: 'Electronics',
    quantity: 4,
    price: 120.5,
    supplier: 'FitGadgets Inc.',
    dateAdded: '2023-10-12T11:20:00Z',
  },
  {
    id: 'q7r8s9t0',
    name: 'Gourmet Coffee Beans',
    category: 'Groceries',
    quantity: 300,
    price: 19.99,
    supplier: 'The Daily Grind',
    dateAdded: '2023-10-11T08:45:00Z',
  },
    {
    id: 'u1v2w3x4',
    name: 'Yoga Mat',
    category: 'Sports',
    quantity: 2,
    price: 30.00,
    supplier: 'ZenFlow',
    dateAdded: '2023-10-15T18:00:00Z',
  },
];

export const CATEGORIES = ['Kitchenware', 'Electronics', 'Apparel', 'Groceries', 'Sports', 'Books'];
export const SUPPLIERS = ['Green Essentials', 'SoundWave Tech', 'Pure Threads', 'FitGadgets Inc.', 'The Daily Grind', 'ZenFlow', 'Bookworm Supplies'];
