
export interface Item {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  dateAdded: string;
}

export enum UserRole {
  Admin = 'Admin',
  Staff = 'Staff',
}

export type View = 'Dashboard' | 'Inventory' | 'Reports';
