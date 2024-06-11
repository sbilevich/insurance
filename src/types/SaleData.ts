export type Product = { id: string; label: string; value: string };

export interface SaleData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  product: Product | null;
}
