import { IngredientItem } from '../types';

export const DEFAULT_INGREDIENTS: IngredientItem[] = [
  {
    id: 'eggs',
    name: 'Tuxum',
    category: 'boshqa',
    unit: 'dona',
    quantity: 6,
    inStock: true,
    icon: '🥚'
  },
  {
    id: 'potatoes',
    name: 'Kartoshka',
    category: 'sabzavotlar',
    unit: 'kg',
    quantity: 2,
    inStock: true,
    icon: '🥔'
  },
  {
    id: 'tomatoes',
    name: 'Pomidor',
    category: 'sabzavotlar',
    unit: 'kg',
    quantity: 1,
    inStock: true,
    icon: '🍅'
  },
  {
    id: 'onions',
    name: 'Piyoz',
    category: 'sabzavotlar',
    unit: 'kg',
    quantity: 2,
    inStock: true,
    icon: '🧅'
  },
  {
    id: 'oil',
    name: 'O‘simlik yog‘i',
    category: 'ziravor',
    unit: 'litr',
    quantity: 1,
    inStock: true,
    icon: '🌻'
  },
  {
    id: 'salt',
    name: 'Tuz',
    category: 'ziravor',
    unit: 'kg',
    quantity: 1,
    inStock: true,
    icon: '🧂'
  },
  {
    id: 'pasta',
    name: 'Makaron',
    category: 'don',
    unit: 'kg',
    quantity: 1,
    inStock: true,
    icon: '🍝'
  },
  {
    id: 'carrots',
    name: 'Sabzi',
    category: 'sabzavotlar',
    unit: 'kg',
    quantity: 0,
    inStock: false,
    icon: '🥕'
  },
  {
    id: 'chicken',
    name: 'Tovuq go‘shti',
    category: 'gosht',
    unit: 'kg',
    quantity: 0,
    inStock: false,
    icon: '🍗'
  },
  {
    id: 'rice',
    name: 'Guruch',
    category: 'don',
    unit: 'kg',
    quantity: 0,
    inStock: false,
    icon: '🍚'
  },
  {
    id: 'mung_beans',
    name: 'Mosh',
    category: 'don',
    unit: 'gr',
    quantity: 0,
    inStock: false,
    icon: '🫘'
  },
  {
    id: 'meat',
    name: 'Go‘sht (mol)',
    category: 'gosht',
    unit: 'kg',
    quantity: 0,
    inStock: false,
    icon: '🥩'
  },
  {
    id: 'flour',
    name: 'Un',
    category: 'don',
    unit: 'kg',
    quantity: 0,
    inStock: false,
    icon: '🌾'
  },
  {
    id: 'milk',
    name: 'Sut',
    category: 'sut',
    unit: 'litr',
    quantity: 0,
    inStock: false,
    icon: '🥛'
  },
  {
    id: 'cream',
    name: 'Qaymoq',
    category: 'sut',
    unit: 'ml',
    quantity: 0,
    inStock: false,
    icon: '🥣'
  },
  {
    id: 'sugar',
    name: 'Shakar',
    category: 'ziravor',
    unit: 'kg',
    quantity: 0,
    inStock: false,
    icon: '🍬'
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  sabzavotlar: 'Sabzavotlar',
  gosht: 'Go‘sht mahsulotlari',
  don: 'Don va un mahsulotlari',
  sut: 'Sut va qaymoq',
  ziravor: 'Yog‘ va ziravorlar',
  boshqa: 'Boshqalar'
};
