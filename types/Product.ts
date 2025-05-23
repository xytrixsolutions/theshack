export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  tags: string[];
  category: Category; // Changed from string to enum type
}
export enum Category {
  NIBBLES = "Nibbles",
  SALADS = "Salads",
  MAC_SPECIALTIES = "Mac & Specialties",
  SANDWICHES = "Sandwiches",
  SEAFOOD = "Seafood",
  PIZZAS = "Pizzas",
  WINGS_TENDERS = "Wings & Tenders",
  KIDS_MENU = "Kids Menu",
  SIDES = "Sides",
  DESSERTS = "Desserts",
  BEVERAGES = "Beverages",
}
