export interface InventoryItem {
  id: number;
  product: {
    name: string;
    category: {
      name: string;
    };
  };
  quantity: number;
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  status: string;
}
