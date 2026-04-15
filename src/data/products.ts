export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductColor {
  name: string;
  value: string;
}

export interface ProductSize {
  label: string;
  value: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  rating: number;
  title: string;
  date: string;
  author: string;
  avatar: string;
  likes: number;
  hasPhoto?: boolean;
  hasVideo?: boolean;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  currency: string;
  rating: number;
  totalSold: number;
  description: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImage[];
  reviews: Review[];
  reviewBreakdown: { stars: number; count: number }[];
  totalReviews: number;
}

export const mainProduct: Product = {
  id: "1",
  brand: "John Lewis ANYDAY",
  name: "Long Sleeve Overshirt, Khaki, 6",
  originalPrice: 40.00,
  salePrice: 28.00,
  currency: "£",
  rating: 4.5,
  totalSold: 1233,
  description: "Bloss aten uttulte toa est potius diloctus sinuluet konpostione soporunt et temporum apserim. Temporus ielo carapont. Colore nifent adutius monactus repsactes funris exti comentas pura topore vulo esia ego conpletus. Rossa pharos mericor.",
  colors: [
    { name: "Royal Brown", value: "#5C3A1E" },
    { name: "Black", value: "#1A1A1A" },
    { name: "Navy Blue", value: "#1E3A5C" },
    { name: "Dark Navy", value: "#0D1B2A" },
  ],
  sizes: [
    { label: "6", value: 6, inStock: true },
    { label: "8", value: 8, inStock: true },
    { label: "10", value: 10, inStock: true },
    { label: "14", value: 14, inStock: true },
    { label: "18", value: 18, inStock: true },
    { label: "20", value: 20, inStock: true },
  ],
  images: [
    { id: "1", url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=700&fit=crop", alt: "Khaki overshirt front view" },
    { id: "2", url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop", alt: "Khaki overshirt side view" },
    { id: "3", url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop", alt: "Khaki overshirt back view" },
    { id: "4", url: "https://images.unsplash.com/photo-1559582798-678dfc68cba3?w=600&h=700&fit=crop", alt: "Khaki overshirt detail" },
    { id: "5", url: "https://images.unsplash.com/photo-1608236415053-3691791bbffe?w=600&h=700&fit=crop", alt: "Khaki overshirt styled" },
  ],
  reviews: [
    { id: "r1", rating: 5, title: "This is amazing product I have.", date: "July 3, 2025 01:21 PM", author: "Darrell Steward", avatar: "", likes: 120 },
    { id: "r2", rating: 5, title: "This is amazing product I have.", date: "July 3, 2025 04 PM", author: "Darlene Robertson", avatar: "", likes: 62 },
    { id: "r3", rating: 5, title: "This is amazing product I have.", date: "June 25, 2020 10:03 PM", author: "Kathryn Murphy", avatar: "", likes: 9 },
    { id: "r4", rating: 5, title: "This is amazing product I have.", date: "July 1, 2020 10:14 PM", author: "Ronald Richards", avatar: "", likes: 134 },
  ],
  reviewBreakdown: [
    { stars: 5, count: 2823 },
    { stars: 4, count: 36 },
    { stars: 3, count: 4 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  totalReviews: 1234,
};

export interface RelatedProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  totalSold: number;
}

export const relatedProducts: RelatedProduct[] = [
  { id: "r1", brand: "Whistles", name: "Wide Leg Cropped Jeans, Denim", price: 26, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=300&h=380&fit=crop", rating: 4.5, totalSold: 1730 },
  { id: "r2", brand: "John Lewis ANYDAY", name: "Long Sleeve Utility Shirt, Navy, 8", price: 26, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=380&fit=crop", rating: 4.0, totalSold: 1225 },
  { id: "r3", brand: "John Lewis ANYDAY", name: "Untied Curved-Hem Shirt, Blue", price: 32, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=380&fit=crop", rating: 4.5, totalSold: 820 },
  { id: "r4", brand: "John Lewis ANYDAY", name: "Denim Overshirt, Mid Wash", price: 40, image: "https://images.unsplash.com/photo-1559582798-678dfc68cba3?w=300&h=380&fit=crop", rating: 4.5, totalSold: 956 },
  { id: "r5", brand: "John Lewis", name: "Linen Blazer, Navy", price: 79, image: "https://images.unsplash.com/photo-1608236415053-3691791bbffe?w=300&h=380&fit=crop", rating: 4.0, totalSold: 1230 },
];

export const popularProducts: RelatedProduct[] = [
  { id: "p1", brand: "Whistles", name: "Wide Leg Cropped Jeans, Denim", price: 26, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=300&h=380&fit=crop", rating: 4.5, totalSold: 1738 },
  { id: "p2", brand: "John Lewis ANYDAY", name: "Long Sleeve Utility Shirt, Navy, 8", price: 26, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=380&fit=crop", rating: 4.5, totalSold: 1765 },
  { id: "p3", brand: "John Lewis ANYDAY", name: "Untied Curved-Hem Shirt, Blue", price: 32, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=380&fit=crop", rating: 4.5, totalSold: 890 },
  { id: "p4", brand: "John Lewis ANYDAY", name: "Denim Overshirt, Mid Wash", price: 40, image: "https://images.unsplash.com/photo-1559582798-678dfc68cba3?w=300&h=380&fit=crop", rating: 4.5, totalSold: 738 },
  { id: "p5", brand: "John Lewis", name: "Linen Blazer, Navy", price: 79, image: "https://images.unsplash.com/photo-1608236415053-3691791bbffe?w=300&h=380&fit=crop", rating: 4.5, totalSold: 1736 },
];
