// types/listing.ts

import { Product } from "./types";

export type BadgeType = "bestseller" | "trending" | "new" | "deal" | null;
export type CategoryType = "Oil" | "Jaggery" | "Sugar" | "Salt" | "Ghee" | "Deals";
export type SortType = "popular" | "rating" | "price_asc" | "price_desc" | "newest" | "discount";
export type ViewType = 3 | 4 | "list";
export type ConcernType = "heart" | "immunity" | "weight" | "gut" | "skin" | "diabetes" | "bone" | "baby";

export interface Product1 {
  id: number;
  name: string;
  sub: string;
  emoji: string;
  category: CategoryType;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  badge: BadgeType;
  sizes: string[];
  tags: string[];
  concerns: ConcernType[];
  isNew: boolean;
  discount: number;
}

export interface FilterState {
  categories: CategoryType[];
  priceMin: number;
  priceMax: number;
  minRating: number;
  // concerns: ConcernType[];
  sort: SortType;
  view: ViewType;
  page: number;
  search: string;
}

// export const ALL_PRODUCTS: Product[] = [
//   { id: 1, name: "Wood Pressed Groundnut Oil", sub: "Cold-Pressed · Traditional Kolhu", emoji: "🫒", category: "Oil", price: 350, mrp: 410, rating: 4.9, reviews: 1240, badge: "bestseller", sizes: ["500ml", "1L", "2L", "5L"], tags: ["Heart Healthy", "Vitamin E"], concerns: ["heart", "immunity"], isNew: false, discount: 15 },
//   { id: 2, name: "Cold-Pressed Mustard Oil", sub: "Kachchi Ghani · Pure & Pungent", emoji: "🌿", category: "Oil", price: 280, mrp: 330, rating: 4.7, reviews: 820, badge: "trending", sizes: ["500ml", "1L"], tags: ["Antibacterial", "Omega-3"], concerns: ["heart", "immunity"], isNew: false, discount: 15 },
//   { id: 3, name: "Virgin Coconut Oil", sub: "Cold-Pressed · Unrefined", emoji: "🥥", category: "Oil", price: 220, mrp: 260, rating: 4.8, reviews: 640, badge: "new", sizes: ["250ml", "500ml", "1L"], tags: ["Skin & Hair", "MCT Rich"], concerns: ["skin", "weight"], isNew: true, discount: 15 },
//   { id: 4, name: "Cold-Pressed Sesame Oil", sub: "Stone Ground · Gingelly", emoji: "⚪", category: "Oil", price: 290, mrp: 340, rating: 4.7, reviews: 430, badge: null, sizes: ["500ml", "1L"], tags: ["Bone Health", "Antioxidant"], concerns: ["bone", "immunity"], isNew: false, discount: 15 },
//   { id: 5, name: "Extra Virgin Olive Oil", sub: "Cold-Pressed · Spanish Origin", emoji: "🫙", category: "Oil", price: 480, mrp: 560, rating: 4.8, reviews: 320, badge: null, sizes: ["250ml", "500ml"], tags: ["Heart Healthy", "Polyphenols"], concerns: ["heart", "gut"], isNew: false, discount: 14 },
//   { id: 6, name: "Cold-Pressed Sunflower Oil", sub: "Refined-Free · Light Flavour", emoji: "🌻", category: "Oil", price: 310, mrp: 360, rating: 4.6, reviews: 510, badge: null, sizes: ["500ml", "1L", "2L"], tags: ["Vitamin E", "Light"], concerns: ["heart"], isNew: false, discount: 14 },
//   { id: 7, name: "Flaxseed Oil", sub: "Cold-Pressed · Omega-3 Rich", emoji: "💜", category: "Oil", price: 360, mrp: 420, rating: 4.7, reviews: 290, badge: "new", sizes: ["250ml", "500ml"], tags: ["Omega-3", "Anti-Inflammatory"], concerns: ["heart", "gut", "diabetes"], isNew: true, discount: 14 },
//   { id: 8, name: "Cold-Pressed Almond Oil", sub: "Sweet Almond · Refined-Free", emoji: "🌰", category: "Oil", price: 550, mrp: 640, rating: 4.9, reviews: 280, badge: null, sizes: ["100ml", "250ml"], tags: ["Skin & Hair", "Vitamin E"], concerns: ["skin"], isNew: false, discount: 14 },
//   { id: 9, name: "Palm Jaggery", sub: "Organic · Tamil Nadu", emoji: "🍫", category: "Jaggery", price: 180, mrp: 210, rating: 4.8, reviews: 980, badge: "bestseller", sizes: ["500g", "1kg"], tags: ["Low GI", "Iron Rich"], concerns: ["diabetes", "gut"], isNew: false, discount: 14 },
//   { id: 10, name: "Sugarcane Jaggery Block", sub: "Desi Khand · Unprocessed", emoji: "🟫", category: "Jaggery", price: 120, mrp: 140, rating: 4.7, reviews: 720, badge: null, sizes: ["500g", "1kg", "2kg"], tags: ["Iron Rich", "Antioxidant"], concerns: ["gut", "immunity"], isNew: false, discount: 14 },
//   { id: 11, name: "Jaggery Powder", sub: "Ready-to-Use · Fine Ground", emoji: "🟤", category: "Jaggery", price: 140, mrp: 165, rating: 4.6, reviews: 460, badge: null, sizes: ["250g", "500g", "1kg"], tags: ["Convenient", "Natural"], concerns: ["gut"], isNew: false, discount: 15 },
//   { id: 12, name: "Coconut Jaggery", sub: "Nattukkal · Coastal Blend", emoji: "🌴", category: "Jaggery", price: 220, mrp: 260, rating: 4.8, reviews: 310, badge: "new", sizes: ["500g", "1kg"], tags: ["Low GI", "Calcium"], concerns: ["diabetes", "bone"], isNew: true, discount: 15 },
//   { id: 13, name: "Date Jaggery", sub: "Khejur Gur · Bengal Tradition", emoji: "🫐", category: "Jaggery", price: 260, mrp: 300, rating: 4.7, reviews: 210, badge: null, sizes: ["250g", "500g"], tags: ["Iron Rich", "Seasonal"], concerns: ["immunity", "gut"], isNew: false, discount: 13 },
//   { id: 14, name: "Khandsari Sugar", sub: "Unrefined · Raw Cane", emoji: "🤍", category: "Sugar", price: 140, mrp: 165, rating: 4.5, reviews: 380, badge: null, sizes: ["500g", "1kg"], tags: ["Unbleached", "Natural"], concerns: ["gut"], isNew: false, discount: 15 },
//   { id: 15, name: "Coconut Sugar", sub: "Low-GI · Organic", emoji: "🌴", category: "Sugar", price: 195, mrp: 230, rating: 4.6, reviews: 290, badge: null, sizes: ["250g", "500g"], tags: ["Low GI", "Diabetic-Friendly"], concerns: ["diabetes", "gut"], isNew: false, discount: 15 },
// ];

export const ITEMS_PER_PAGE = 12;
export const MAX_PRICE = 1500;

export const CATEGORY_OPTIONS: { value: CategoryType; label: string; count: number }[] = [
  { value: "Oil", label: "Cold-Pressed Oils", count: 14 },
  { value: "Jaggery", label: "Jaggery", count: 5 },
  { value: "Sugar", label: "Organic Sugar", count: 6 },
  { value: "Salt", label: "Natural Salt", count: 3 },
  { value: "Ghee", label: "Ghee & Butter", count: 3 },
  { value: "Deals", label: "Deals & Bundles", count: 5 },
];

export const CONCERN_OPTIONS: { value: ConcernType; label: string; emoji: string }[] = [
  { value: "heart", label: "Heart", emoji: "❤️" },
  { value: "immunity", label: "Immunity", emoji: "🛡️" },
  { value: "weight", label: "Weight Loss", emoji: "⚖️" },
  { value: "gut", label: "Gut Health", emoji: "🌿" },
  { value: "skin", label: "Skin & Hair", emoji: "✨" },
  { value: "diabetes", label: "Diabetes", emoji: "🩺" },
  { value: "bone", label: "Bone Health", emoji: "🦴" },
  { value: "baby", label: "Baby Safe", emoji: "🍼" },
];

export function filterAndSort(products: Product[], filters: FilterState): Product[] {
  let data = [...products];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    data = data.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.KeyBenefits.some(t => t.toLowerCase().includes(q))
    );
  }

  // if (filters.categories.length > 0)
  //   data = data.filter(p => filters.categories.includes(p.category));

  data = data.filter(p => Number(p.price) >= filters.priceMin && Number(p.price) <= filters.priceMax);

  if (filters.minRating > 0)
    data = data.filter(p => Number(p.rating) >= filters.minRating);

  // if (filters.concerns.length > 0)
  //   data = data.filter(p => filters.concerns.some(c => p.concerns.includes(c)));

  switch (filters.sort) {
    case "rating":
      data.sort((a, b) => Number(b.rating) - Number(a.rating));
      break;
    case "price_asc":
      data.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case "price_desc":
      data.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    // case "newest":
    //   data.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    //   break;
    // case "discount":
    //   data.sort((a, b) => Number(b.discount) - Number(a.discount));
    //   break;
    default:
      data.sort((a, b) => Number(b.stock) - Number(a.stock));
  }

  return data;
}
