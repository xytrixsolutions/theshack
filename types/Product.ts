export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  tags: string[];
  category: string;
}
