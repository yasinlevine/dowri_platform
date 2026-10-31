/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Artisan {
  name: string;
  nameFa: string;
  role: string;
  roleFa: string;
  avatar?: string;
  bioFa: string;
}

export interface Product {
  id: string;
  title: string;
  titleFa: string;
  subtitleFa: string;
  category: 'ceramics' | 'jewelry' | 'art' | 'lifestyle' | 'cafe';
  categoryFa: string;
  price: number; // in Tomans
  originalPrice?: number;
  descriptionFa: string;
  storyFa: string;
  materialsFa: string;
  dimensionsFa: string;
  images: string[];
  stock: number;
  isFeatured?: boolean;
  isLimitedRun?: boolean;
  artisan: Artisan;
  tagsFa: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserAddress {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  notes?: string;
}

export interface User {
  phone: string;
  name?: string;
  address?: UserAddress;
  orders?: Order[];
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  discount: number;
  shippingFee: number;
  finalAmount: number;
  address: UserAddress;
  paymentMethod: 'online' | 'cod' | 'card_transfer';
  status: 'confirmed' | 'preparing' | 'shipped' | 'delivered';
}

export interface CommunityEvent {
  id: string;
  titleFa: string;
  typeFa: string;
  dateFa: string;
  timeFa: string;
  instructorFa: string;
  capacity: number;
  registeredCount: number;
  price: number; // in Tomans
  image: string;
  descriptionFa: string;
}
