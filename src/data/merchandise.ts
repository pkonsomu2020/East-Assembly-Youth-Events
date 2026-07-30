import type { ColorOption, MerchItem } from '../types/domain';

export const SIZES = ['S', 'M', 'L', 'XL', '2XL'] as const;

export const COLORS: ColorOption[] = [
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Sky Blue', hex: '#1FA7E0' },
  { name: 'Navy', hex: '#1B2A4A' },
  { name: 'Grey', hex: '#9AA5AD' },
  { name: 'Red', hex: '#D0342C' },
];

export const ITEMS: MerchItem[] = [
  { id: 'hoodie', name: 'Zip Hoodie', price: 3000, hasSize: true, hasColor: true, hasTeam: false },
  { id: 'tshirt', name: 'T-Shirt', price: 1500, hasSize: true, hasColor: true, hasTeam: false },
  { id: 'jersey', name: 'Jersey', price: 1500, hasSize: true, hasColor: false, hasTeam: true },
  { id: 'cap', name: 'Cap', price: 1000, hasSize: false, hasColor: false, hasTeam: false },
  { id: 'tote', name: 'Tote Bag', price: 1000, hasSize: false, hasColor: false, hasTeam: false },
  { id: 'pen', name: 'Pen', price: 200, hasSize: false, hasColor: false, hasTeam: false },
  { id: 'sweatshirt', name: 'Sweatshirt', price: 2000, hasSize: true, hasColor: true, hasTeam: false },
  { id: 'sweatsuit', name: 'Sweat Suit', price: 3000, hasSize: true, hasColor: true, hasTeam: false },
  { id: 'book', name: 'Book', price: null, hasSize: false, hasColor: false, hasTeam: false, comingSoon: true },
];
