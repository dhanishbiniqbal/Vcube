// Static product data replacing Supabase integration.
// Extend or modify as needed.

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string; // slug-like category identifier
  image_url: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
  created_at: string;
};

// Example categories: shirts, pants, jackets
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Classic Cotton Shirt',
    description: 'Breathable premium cotton shirt perfect for everyday wear.',
    price: 149,
    category_id: 'shirts',
    image_url: '/V-cube-1-3-1.png',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Black'],
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p2',
    name: 'Tailored Slim Pants',
    description: 'Modern slim-fit pants with stretch for comfort and mobility.',
    price: 199,
    category_id: 'pants',
    image_url: '/V-cube-1-3-1.png',
    sizes: ['30', '32', '34', '36'],
    colors: ['Navy', 'Gray'],
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p3',
    name: 'Lightweight Bomber Jacket',
    description: 'Stylish bomber jacket ideal for transitional weather.',
    price: 299,
    category_id: 'jackets',
    image_url: '/V-cube-1-3-1.png',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Olive'],
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p4',
    name: 'Premium Linen Shirt',
    description: 'Cool and breathable linen for hot climates.',
    price: 179,
    category_id: 'shirts',
    image_url: '/V-cube-1-3-1.png',
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Sky'],
    featured: false,
    created_at: new Date().toISOString(),
  },
];

// In a real app you could later swap this for a fetch from another backend.