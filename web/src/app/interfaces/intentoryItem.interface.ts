export interface InventoryItem {
  id: number;
  productName: string;
  availableStock: number;
  stockLevel: 'Low' | 'Medium' | 'High';
  location: string;
  lastUpdated: string;
}
