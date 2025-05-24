export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  category: Category; // Changed from string to enum type
}
export enum Category {
  NIBBLES = "Nibbles",
  FRESH_GREENS = "Fresh Greens",
  HAND_HELDS = "Hand Helds",
  MAC = "Mac",
  THE_POND = "The Pond",
  PIES = "Pies",
  COOP = "Coop",
  THE_LITTLE_ONES = "The Little ones",
  SIDES = "Sides",
  BEVERAGES = "Beverages",
  SWEET_TOOTH = "Sweet Tooth",
  SPECIALTY_PIES = "Specialty Pies",
}
