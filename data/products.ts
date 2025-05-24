import { Product, Category } from "@/types/Product";

export const allProducts: Product[] = [
  // ===== NIBBLES =====
  {
    id: "1",
    name: "SWEET N' STINKY",
    image: "https://picsum.photos/200/300",

    price: 9.99,
    description:
      "Sweet Potato Fries topped with Blue Cheese Crumbles and Green Onions served with Jalapeño Ranch Dressing",
    category: Category.NIBBLES,
  },
  {
    id: "2",
    name: "PHILLY CHEESESTEAK EGGROLLS",
    price: 9.99,
    description: "Served with Sweet Chili Sauce",
    category: Category.NIBBLES,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "3",
    name: "JALAPEÑO CHEESE BRATZ",
    price: 9.99,
    description: "Served with Jalapeño Ranch Dressing",
    category: Category.NIBBLES,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "4",
    name: "BLUE CHEESE PECAN CELERY STICKS",
    price: 7.99,
    description:
      "Celery Sticks stuffed with Blue Cheese Crumbles, Candied Pecans and drizzled with Honey",
    category: Category.NIBBLES,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "5",
    name: "MOZZARELLA BRICKS",
    price: 9.99,
    description: "Served with Ranch Dressing",
    category: Category.NIBBLES,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "6",
    name: "GARLIC CHEESE BREAD",
    price: 12.99,
    description: "Garlic Cheese Bread",
    category: Category.NIBBLES,
    image: "https://picsum.photos/200/300",
  },

  // ===== FRESH GREENS =====
  {
    id: "7",
    name: "SHACK HOUSE SALAD",
    price: 8.99,
    description:
      "Iceberg Lettuce, Tomatoes, Red Onions, Black Olives, Croutons and Mozzarella | Choice of Ranch, Jalapeño Ranch, Blue Cheese, Balsamic Vinaigrette, or Caesar",
    image: "https://picsum.photos/200/300",

    category: Category.SALADS,
  },
  {
    id: "8",
    name: "CAESAR SALAD",
    price: 9.99,
    description:
      "Romaine Lettuce, Parmesan Cheese, Croutons with Caesar Dressing",
    image: "https://picsum.photos/200/300",

    category: Category.SALADS,
  },
  {
    id: "9",
    name: "WEDGE",
    price: 12.99,
    description:
      "Iceberg Lettuce, Crumbled Blue Cheese, Bacon, Grape Tomatoes, Red Onion with Blue Cheese Dressing",
    image: "https://picsum.photos/200/300",

    category: Category.SALADS,
  },
  {
    id: "10",
    name: "HOUSE OF BLUES GRILLED CHICKEN SALAD",
    price: 14.99,
    description:
      "Mixed Greens, Grilled Chicken Tenders, Candied Pecans, Grape Tomatoes, Blue Cheese Crumbles with Balsamic Vinaigrette",
    image: "https://picsum.photos/200/300",

    category: Category.SALADS,
  },
  {
    id: "11",
    name: "THE RUSTIC ARUGULA",
    price: 10.99,
    description:
      "Arugula, Feta, Red Onion, Candied Pecan and Dried Cranberries with Balsamic Vinaigrette Dressing",
    image: "https://picsum.photos/200/300",

    category: Category.SALADS,
  },

  // ===== MAC & SPECIALTIES =====
  {
    id: "12",
    name: "SHACK MAC",
    image: "https://picsum.photos/200/300",

    price: 11.99,
    description:
      "3 Cheese Mac topped with Panko Bread Crumbs | Add Bacon Bits +$2",
    category: Category.MAC_SPECIALTIES,
  },
  {
    id: "13",
    name: "SPICY BIRD",
    image: "https://picsum.photos/200/300",

    price: 15.99,
    description:
      "3 Cheese Mac, Buffalo Tenders, Blue Cheese Crumbles drizzled with Franks Red Hot Sauce",
    category: Category.MAC_SPECIALTIES,
  },
  {
    id: "14",
    name: "COWBOY",
    image: "https://picsum.photos/200/300",

    price: 14.99,
    description:
      "3 Cheese Mac, Pulled Pork, Pickled Jalapenos, Bacon drizzled with BBQ Sauce",
    category: Category.MAC_SPECIALTIES,
  },
  {
    id: "15",
    name: "SMOKY JOES",
    image: "https://picsum.photos/200/300",

    price: 16.99,
    description: "3 Cheese Mac, Smoked Brisket topped with Fried Onion Strings",
    category: Category.MAC_SPECIALTIES,
  },

  // ===== SANDWICHES =====
  {
    id: "16",
    image: "https://picsum.photos/200/300",

    name: "CLUCKING HEN",
    price: 13.99,
    description:
      "Grilled or Fried Chicken Tenders with Lettuce, Tomato, Onion and Shack Sauce | Served with Fries",
    category: Category.SANDWICHES,
  },
  {
    id: "17",
    image: "https://picsum.photos/200/300",

    name: "THE REDNECK",
    price: 13.99,
    description:
      "Pulled Pork Sandwich with Tangy Slaw and BBQ sauce | Served with Fries",
    category: Category.SANDWICHES,
  },
  {
    id: "18",
    image: "https://picsum.photos/200/300",

    name: "BRISKET STACK",
    price: 15.99,
    description:
      "Smoked Brisket with Fried Onion Strings and BBQ sauce | Served with Fries",
    category: Category.SANDWICHES,
  },
  {
    id: "19",
    image: "https://picsum.photos/200/300",

    name: "SHACK DOUBLE STACK BURGER",
    price: 14.99,
    description:
      "Short Rib and Brisket Blend Burger with American Cheese, Lettuce, Tomato, Onion and Shack Sauce | Served with Fries (+$4 Triple Stack)",
    category: Category.SANDWICHES,
  },
  {
    id: "20",
    name: "FINDING NEMO",
    price: 13.99,
    description:
      "Beer Battered Cod with Shredded Lettuce, Tomato and Secret Sauce | Served with Fries",
    image: "https://picsum.photos/200/300",

    category: Category.SANDWICHES,
  },

  // ===== SEAFOOD =====
  {
    id: "21",
    name: "FISH AND CHIPS",
    price: 19.99,
    image: "https://picsum.photos/200/300",

    description: "Beer Battered Cod with Coleslaw and Chunky Chips",
    category: Category.SEAFOOD,
  },

  // ===== SPECIALTY PIES =====
  {
    id: "22",
    name: "THE STACY",
    image: "https://picsum.photos/200/300",

    price: 16.99,
    description:
      "Marinara, Mozzarella, Feta, Mushrooms, Green Peppers, Red Onions, Black Olives and Tomatoes",
    category: Category.PIZZAS,
  },
  {
    id: "23",
    name: "GODFATHER",
    image: "https://picsum.photos/200/300",

    price: 21.99,
    description:
      "Marinara, Mozzarella, Pepperoni, Mushroom, Green Peppers, Onion, Italian Sausage, Black Olives and Ham",
    category: Category.PIZZAS,
  },
  {
    id: "24",
    name: "BBQ CHICKEN",
    image: "https://picsum.photos/200/300",

    price: 17.99,
    description:
      "BBQ Sauce, Mozzarella, Garlic Chicken, Red Onion and Cilantro",
    category: Category.PIZZAS,
  },
  {
    id: "25",
    name: "MEAT SWEATS",
    image: "https://picsum.photos/200/300",

    price: 21.99,
    description:
      "Olive Oil Base, Mozzarella, Smoked Brisket, Smoked Gouda with Fresh Arugula",
    category: Category.PIZZAS,
  },
  {
    id: "26",
    name: "BREAKFAST FOR DINNER",
    image: "https://picsum.photos/200/300",

    price: 19.99,
    description:
      "Marinara, Bacon, Breakfast Sausage, Mozzarella, Fried Egg, Diced Potatoes, Peppers and Onions",
    category: Category.PIZZAS,
  },
  {
    id: "27",
    name: "SURFER DUDE",
    image: "https://picsum.photos/200/300",

    price: 17.99,
    description: "Marinara, Mozzarella, Bacon, Pineapple and Ham",
    category: Category.PIZZAS,
  },
  {
    id: "28",
    name: "BUFFALO CHICKEN",
    price: 18.99,
    image: "https://picsum.photos/200/300",

    description:
      "Ranch Base, Mozzarella, Grilled Chicken, Blue Cheese Crumbles with Franks Red Hot",
    category: Category.PIZZAS,
  },
  {
    id: "29",
    name: "THE COWBOY",
    price: 18.99,
    image: "https://picsum.photos/200/300",

    description:
      "Jalapeno Ranch Base, Mozzarella, Pulled Pork, Jalapenos with BBQ Sauce",
    category: Category.PIZZAS,
  },
  {
    id: "30",
    name: "HIGH MAINTENANCE",
    price: 18.99,
    description:
      "Fig Jam Base, Dr. Pepper Caramelized Onions, Mushroom and Mozzarella",
    image: "https://picsum.photos/200/300",

    category: Category.PIZZAS,
  },

  // ===== WINGS & TENDERS =====
  {
    id: "31",
    name: "TRADITIONAL WINGS (10)",
    price: 10.99,
    image: "https://picsum.photos/200/300",

    description:
      "Plain, BBQ, Buffalo, Teriyaki, or Sizzling Honey Garlic | Served with Ranch/Blue Cheese",
    category: Category.WINGS_TENDERS,
  },
  {
    id: "32",
    name: "TRADITIONAL WINGS (15)",
    price: 15.99,
    image: "https://picsum.photos/200/300",

    description:
      "Plain, BBQ, Buffalo, Teriyaki, or Sizzling Honey Garlic | Served with Ranch/Blue Cheese",
    category: Category.WINGS_TENDERS,
  },
  {
    id: "33",
    name: "TRADITIONAL WINGS (25)",
    price: 25.99,
    image: "https://picsum.photos/200/300",

    description:
      "Plain, BBQ, Buffalo, Teriyaki, or Sizzling Honey Garlic | Served with Ranch/Blue Cheese",
    category: Category.WINGS_TENDERS,
  },
  {
    id: "34",
    name: "BONELESS TENDERS (4)",
    price: 12.99,
    image: "https://picsum.photos/200/300",

    description: "Grilled or Fried with Fries | Boom Boom Sauce (+$1 Buffalo)",
    category: Category.WINGS_TENDERS,
  },
  {
    id: "35",
    name: "BONELESS TENDERS (8)",
    price: 18.99,
    description: "Grilled or Fried with Fries | Boom Boom Sauce (+$1 Buffalo)",
    image: "https://picsum.photos/200/300",

    category: Category.WINGS_TENDERS,
  },

  // ===== KIDS MENU =====
  {
    id: "36",
    name: "CHEESEBURGER & FRIES",
    price: 8.99,
    image: "https://picsum.photos/200/300",

    category: Category.KIDS_MENU,
  },
  {
    id: "37",
    name: "CHICKEN TENDERS & FRIES",
    price: 7.99,
    category: Category.KIDS_MENU,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "38",
    name: "MAC AND CHEESE",
    price: 7.99,
    image: "https://picsum.photos/200/300",

    category: Category.KIDS_MENU,
  },
  {
    id: "39",
    image: "https://picsum.photos/200/300",

    name: "GRILLED CHEESE & FRIES",
    price: 7.99,
    category: Category.KIDS_MENU,
  },

  // ===== SIDES =====
  {
    id: "40",
    image: "https://picsum.photos/200/300",

    name: "SHACK FRIES",
    price: 4.99,
    category: Category.SIDES,
  },
  {
    id: "41",
    name: "SWEET POTATO FRIES",
    price: 4.99,
    category: Category.SIDES,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "42",
    name: "FRIED ONION STRINGS",
    price: 4.99,
    category: Category.SIDES,
    image: "https://picsum.photos/200/300",
  },

  // ===== DESSERTS =====
  {
    id: "43",
    name: "HENDOOKIE",
    price: 9.99,
    description: "Baked Chocolate Chip Cookie Dough with Vanilla Ice Cream",
    image: "https://picsum.photos/200/300",

    category: Category.DESSERTS,
  },
  {
    id: "44",
    name: "SALTED CARAMEL CHEESECAKE",
    price: 8.99,
    category: Category.DESSERTS,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "45",
    name: "I DARE YOU",
    price: 8.99,
    description: "Cheese Curds with Honey, Cinnamon and Sugar",
    category: Category.DESSERTS,
    image: "https://picsum.photos/200/300",
  },

  // ===== BEVERAGES =====
  {
    id: "46",
    name: "ICED TEA",
    price: 2.75,
    category: Category.BEVERAGES,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "47",
    name: "FOUNTAIN DRINKS",
    price: 2.75,
    category: Category.BEVERAGES,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "48",
    name: "SPARKLING WATER",
    price: 3.0,
    category: Category.BEVERAGES,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "49",
    name: "BOTTLED WATER",
    price: 3.0,
    category: Category.BEVERAGES,
    image: "https://picsum.photos/200/300",
  },
];
