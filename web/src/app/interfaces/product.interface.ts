export interface Product {
  id: number;
  name: string;
  category: {
    name: string;
  };
  price: string;
  brand: string | null;
}
