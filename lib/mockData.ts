export type Category = "Electronics" | "Clothing" | "Home" | "Beauty";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  featured?: boolean;
  newArrival?: boolean;
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
}

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Premium Over-Ear Headphones",
    description:
      "Experience the best in class electronics with our premium selection. Designed for durability and style.",
    price: 199.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: 4.5,
    featured: true,
  },
  {
    id: "prod-2",
    name: "Minimalist Smart Watch",
    description:
      "Experience the best in class electronics with our premium selection. Designed for durability and style.",
    price: 149.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: 4.2,
    featured: true,
  },
  {
    id: "prod-3",
    name: "RGB Gaming Mouse",
    description:
      "Experience the best in class electronics with our premium selection. Designed for durability and style.",
    price: 59.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    rating: 4.8,
    featured: true,
  },
  {
    id: "prod-4",
    name: "Mechanical Keyboard",
    description:
      "Experience the best in class electronics with our premium selection. Designed for durability and style.",
    price: 129.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    rating: 4.7,
    featured: true,
  },
  {
    id: "prod-5",
    name: "Professional Camera Lens",
    description:
      "Experience the best in class electronics with our premium selection. Designed for durability and style.",
    price: 499.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&q=80",
    rating: 4.9,
    featured: true,
  },
  {
    id: "prod-6",
    name: "Portable Wireless Speaker",
    description:
      "Experience the best in class electronics with our premium selection. Designed for durability and style.",
    price: 89.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80",
    rating: 4.4,
    featured: true,
  },
  {
    id: "prod-7",
    name: "Wireless Earbuds",
    description:
      "Experience the best in class electronics with our premium selection. Designed for durability and style.",
    price: 109.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
    rating: 4.6,
    featured: true,
  },
  {
    id: "prod-8",
    name: "Remote Control Drone",
    description:
      "Experience the best in class electronics with our premium selection. Designed for durability and style.",
    price: 299.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&q=80",
    rating: 4.3,
    featured: true,
  },
  {
    id: "prod-9",
    name: "Classic White T-Shirt",
    description:
      "Experience the best in class clothing with our premium selection. Designed for durability and style.",
    price: 24.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80",
    rating: 4.5,
    newArrival: true,
  },
  {
    id: "prod-10",
    name: "Winter Puffer Jacket",
    description:
      "Experience the best in class clothing with our premium selection. Designed for durability and style.",
    price: 149.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
    rating: 4.7,
    newArrival: true,
  },
  {
    id: "prod-11",
    name: "Blue Denim Jeans",
    description:
      "Experience the best in class clothing with our premium selection. Designed for durability and style.",
    price: 59.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
    rating: 4.4,
    newArrival: true,
  },
  {
    id: "prod-12",
    name: "Fashion Leather Jacket",
    description:
      "Experience the best in class clothing with our premium selection. Designed for durability and style.",
    price: 199.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    rating: 4.8,
    newArrival: true,
  },
  {
    id: "prod-13",
    name: "Casual Hoodie",
    description:
      "Experience the best in class clothing with our premium selection. Designed for durability and style.",
    price: 49.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
    rating: 4.6,
    newArrival: true,
  },
  {
    id: "prod-14",
    name: "Casual Sneakers",
    description:
      "Experience the best in class clothing with our premium selection. Designed for durability and style.",
    price: 89.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    rating: 4.5,
    newArrival: true,
  },
  {
    id: "prod-15",
    name: "Men Dress Shirt",
    description:
      "Experience the best in class clothing with our premium selection. Designed for durability and style.",
    price: 39.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
    rating: 4.3,
  },
  {
    id: "prod-16",
    name: "Summer Dress",
    description:
      "Experience the best in class clothing with our premium selection. Designed for durability and style.",
    price: 69.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    rating: 4.7,
  },
  {
    id: "prod-17",
    name: "Modern Interior Chair",
    description:
      "Experience the best in class home items with our premium selection. Designed for durability and style.",
    price: 129.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80",
    rating: 4.6,
  },
  {
    id: "prod-18",
    name: "Electric Desk Lamp",
    description:
      "Experience the best in class home items with our premium selection. Designed for durability and style.",
    price: 39.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    rating: 4.5,
  },
  {
    id: "prod-19",
    name: "Espresso Coffee Maker",
    description:
      "Experience the best in class home items with our premium selection. Designed for durability and style.",
    price: 249.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&q=80",
    rating: 4.8,
  },
  {
    id: "prod-20",
    name: "Ceramic Dinner Plates",
    description:
      "Experience the best in class home items with our premium selection. Designed for durability and style.",
    price: 49.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1614548539644-ef528186523a?w=500&q=80",
    rating: 4.4,
  },
  {
    id: "prod-21",
    name: "Kitchen Cookware Set",
    description:
      "Experience the best in class home items with our premium selection. Designed for durability and style.",
    price: 179.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80",
    rating: 4.7,
  },
  {
    id: "prod-22",
    name: "Modern Living Room Sofa",
    description:
      "Experience the best in class home items with our premium selection. Designed for durability and style.",
    price: 899.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    rating: 4.9,
  },
  {
    id: "prod-23",
    name: "Wooden Dining Table",
    description:
      "Experience the best in class home items with our premium selection. Designed for durability and style.",
    price: 499.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500&q=80",
    rating: 4.6,
  },
  {
    id: "prod-24",
    name: "Skin Care Lotion Bottle",
    description:
      "Experience the best in class beauty items with our premium selection. Designed for durability and style.",
    price: 29.99,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
    rating: 4.5,
  },
  {
    id: "prod-25",
    name: "Face Serum Dropper",
    description:
      "Experience the best in class beauty items with our premium selection. Designed for durability and style.",
    price: 44.99,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
    rating: 4.7,
  },
  {
    id: "prod-26",
    name: "Matte Lipstick",
    description:
      "Experience the best in class beauty items with our premium selection. Designed for durability and style.",
    price: 19.99,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80",
    rating: 4.3,
  },
  {
    id: "prod-27",
    name: "Glass Perfume Bottle",
    description:
      "Experience the best in class beauty items with our premium selection. Designed for durability and style.",
    price: 89.99,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
    rating: 4.8,
  },
  {
    id: "prod-28",
    name: "Face Cream Jar",
    description:
      "Experience the best in class beauty items with our premium selection. Designed for durability and style.",
    price: 34.99,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&q=80",
    rating: 4.6,
  },
  {
    id: "prod-29",
    name: "Essential Oil Dropper",
    description:
      "Experience the best in class beauty items with our premium selection. Designed for durability and style.",
    price: 24.99,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
    rating: 4.5,
  },
  {
    id: "prod-30",
    name: "Handmade Bath Soap Bars",
    description:
      "Experience the best in class beauty items with our premium selection. Designed for durability and style.",
    price: 14.99,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1512437136892-3d200c4645b9?w=500&q=80",
    rating: 4.8,
  },
];

export const initialOrders: Order[] = [
  {
    id: "ORD-12345",
    date: "2026-06-17T12:00:00.000Z",
    status: "Delivered",
    items: [
      {
        productId: "prod-1",
        name: "Premium Over-Ear Headphones",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      },
    ],
    total: 199.99,
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-12346",
    date: "2026-06-14T12:00:00.000Z",
    status: "Shipped",
    items: [
      {
        productId: "prod-9",
        name: "Classic White T-Shirt",
        price: 24.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80",
      },
    ],
    total: 49.98,
    trackingNumber: "TRK123456789",
  },
];

export const merchantStats = {
  totalProducts: mockProducts.length,
  ordersToday: 12,
  revenue: 3450.5,
};

export const chartData = [
  { name: "Mon", revenue: 400 },
  { name: "Tue", revenue: 300 },
  { name: "Wed", revenue: 550 },
  { name: "Thu", revenue: 450 },
  { name: "Fri", revenue: 700 },
  { name: "Sat", revenue: 900 },
  { name: "Sun", revenue: 850 },
];
