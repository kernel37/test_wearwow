export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isTrending?: boolean;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  subcategories: string[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  gradient: string;
  cta: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'placed' | 'shipped' | 'out_for_delivery' | 'delivered';
  total: number;
  items: { product: Product; quantity: number }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export const categories: Category[] = [
  {
    id: 'women',
    name: 'Women',
    icon: '👗',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    subcategories: ['Dresses', 'Tops', 'Jeans', 'Skirts', 'Jackets'],
  },
  {
    id: 'men',
    name: 'Men',
    icon: '👔',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    subcategories: ['Shirts', 'T-Shirts', 'Jeans', 'Jackets', 'Suits'],
  },
  {
    id: 'kids',
    name: 'Kids',
    icon: '🧒',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=400&fit=crop',
    subcategories: ['Boys', 'Girls', 'Baby', 'Shoes', 'Accessories'],
  },
  {
    id: 'shoes',
    name: 'Shoes',
    icon: '👟',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    subcategories: ['Sneakers', 'Heels', 'Boots', 'Sandals', 'Sports'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: '👜',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop',
    subcategories: ['Bags', 'Jewelry', 'Watches', 'Sunglasses', 'Hats'],
  },
];

export const banners: Banner[] = [
  {
    id: '1',
    title: '🔥 Summer Sale',
    subtitle: 'Up to 50% Off on Trending Styles',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop',
    gradient: 'from-wearwow-pink via-wearwow-magenta to-wearwow-purple',
    cta: 'Shop Now',
  },
  {
    id: '2',
    title: '✨ New Arrivals',
    subtitle: 'Fresh Drops Every Week',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=400&fit=crop',
    gradient: 'from-wearwow-yellow via-wearwow-pink to-wearwow-magenta',
    cta: 'Explore',
  },
  {
    id: '3',
    title: '👟 Street Style',
    subtitle: 'The Hottest Urban Collection',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=400&fit=crop',
    gradient: 'from-wearwow-cyan via-wearwow-purple to-wearwow-pink',
    cta: 'View Collection',
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Floral Summer Dress',
    price: 49.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
    category: 'women',
    subcategory: 'Dresses',
    colors: ['#FF69B4', '#87CEEB', '#FFB6C1'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 256,
    isNew: true,
    description: 'Beautiful floral summer dress perfect for any occasion. Lightweight and breathable fabric.',
  },
  {
    id: 'p2',
    name: 'Classic Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=500&fit=crop',
    category: 'women',
    subcategory: 'Jackets',
    colors: ['#4169E1', '#000080'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 189,
    isTrending: true,
    description: 'Timeless denim jacket that goes with everything. Premium quality denim.',
  },
  {
    id: 'p3',
    name: 'Urban Sneakers',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=500&fit=crop',
    category: 'shoes',
    subcategory: 'Sneakers',
    colors: ['#FFFFFF', '#000000', '#FF69B4'],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    rating: 4.9,
    reviews: 432,
    isTrending: true,
    description: 'Comfortable and stylish urban sneakers. Perfect for daily wear.',
  },
  {
    id: 'p4',
    name: 'Graphic Tee - Vibe',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop',
    category: 'men',
    subcategory: 'T-Shirts',
    colors: ['#FFFFFF', '#000000', '#FFD700'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.5,
    reviews: 167,
    isNew: true,
    description: 'Express yourself with this bold graphic tee. 100% cotton comfort.',
  },
  {
    id: 'p5',
    name: 'Crossbody Bag',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
    category: 'accessories',
    subcategory: 'Bags',
    colors: ['#A855F7', '#EC4899', '#000000'],
    sizes: ['One Size'],
    rating: 4.7,
    reviews: 298,
    description: 'Trendy crossbody bag with adjustable strap. Perfect for everyday use.',
  },
  {
    id: 'p6',
    name: 'Slim Fit Chinos',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
    category: 'men',
    subcategory: 'Jeans',
    colors: ['#D2B48C', '#2F4F4F', '#000000'],
    sizes: ['28', '30', '32', '34', '36'],
    rating: 4.4,
    reviews: 145,
    description: 'Classic slim fit chinos for a polished look. Stretch fabric for comfort.',
  },
  {
    id: 'p7',
    name: 'Kids Rainbow Hoodie',
    price: 39.99,
    originalPrice: 54.99,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop',
    category: 'kids',
    subcategory: 'Boys',
    colors: ['#FF69B4', '#87CEEB', '#98FB98'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    rating: 4.9,
    reviews: 87,
    isNew: true,
    description: 'Colorful and cozy hoodie for kids. Soft fleece lining.',
  },
  {
    id: 'p8',
    name: 'Statement Sunglasses',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop',
    category: 'accessories',
    subcategory: 'Sunglasses',
    colors: ['#000000', '#8B4513', '#FF69B4'],
    sizes: ['One Size'],
    rating: 4.6,
    reviews: 234,
    isTrending: true,
    description: 'Bold statement sunglasses with UV protection. Be the center of attention.',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 149.97,
    items: [
      { product: products[0], quantity: 1 },
      { product: products[4], quantity: 1 },
      { product: products[3], quantity: 1 },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-18',
    status: 'out_for_delivery',
    total: 129.99,
    items: [{ product: products[2], quantity: 1 }],
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-20',
    status: 'shipped',
    total: 89.99,
    items: [{ product: products[1], quantity: 1 }],
  },
];

export const mockUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+1 234 567 8900',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
};

export const mockNotifications = [
  {
    id: 'n1',
    title: 'Order Shipped! 📦',
    message: 'Your order ORD-2024-003 is on the way!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'n2',
    title: 'Flash Sale! ⚡',
    message: '50% off on all summer collection. Limited time!',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 'n3',
    title: 'Delivery Update 🚚',
    message: 'Your order ORD-2024-002 is out for delivery!',
    time: '1 day ago',
    read: true,
  },
];
