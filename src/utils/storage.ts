import { IngredientItem, ShoppingItem, WeeklyPlan } from '../types';
import { DEFAULT_INGREDIENTS } from '../data/defaultIngredients';

export const STORAGE_KEYS = {
  INGREDIENTS: 'smart_pantry_ingredients_v1',
  SHOPPING_LIST: 'smart_pantry_shopping_v1',
  WEEKLY_PLAN: 'smart_pantry_weekly_plan_v1',
};

export const DEFAULT_WEEKLY_PLAN: WeeklyPlan = {
  dushanba: {
    dayName: 'Dushanba',
    dayShort: 'Dush',
    lunch: { recipeId: 'sabzavotli-makaron' },
    dinner: { recipeId: 'kartoshka-qovurmasi' },
  },
  seshanba: {
    dayName: 'Seshanba',
    dayShort: 'Sesh',
    lunch: { recipeId: 'tuxumli-pomidor' },
    dinner: { recipeId: 'tovuqli-guruch' },
  },
  chorshanba: {
    dayName: 'Chorshanba',
    dayShort: 'Chor',
    lunch: { recipeId: null },
    dinner: { recipeId: 'moshxorda' },
  },
  payshanba: {
    dayName: 'Payshanba',
    dayShort: 'Pay',
    lunch: { recipeId: 'oddiy-quymoq' },
    dinner: { recipeId: 'sabzavotli-shorva' },
  },
  juma: {
    dayName: 'Juma',
    dayShort: 'Juma',
    lunch: { recipeId: null },
    dinner: { recipeId: 'tovuqli-makaron' },
  },
  shanba: {
    dayName: 'Shanba',
    dayShort: 'Shan',
    lunch: { recipeId: 'kartoshka-qovurmasi' },
    dinner: { recipeId: null },
  },
  yakshanba: {
    dayName: 'Yakshanba',
    dayShort: 'Yak',
    lunch: { recipeId: 'tovuqli-guruch' },
    dinner: { recipeId: 'sabzavotli-makaron' },
  },
};

export const EMPTY_WEEKLY_PLAN: WeeklyPlan = {
  dushanba: { dayName: 'Dushanba', dayShort: 'Dush', lunch: { recipeId: null }, dinner: { recipeId: null } },
  seshanba: { dayName: 'Seshanba', dayShort: 'Sesh', lunch: { recipeId: null }, dinner: { recipeId: null } },
  chorshanba: { dayName: 'Chorshanba', dayShort: 'Chor', lunch: { recipeId: null }, dinner: { recipeId: null } },
  payshanba: { dayName: 'Payshanba', dayShort: 'Pay', lunch: { recipeId: null }, dinner: { recipeId: null } },
  juma: { dayName: 'Juma', dayShort: 'Juma', lunch: { recipeId: null }, dinner: { recipeId: null } },
  shanba: { dayName: 'Shanba', dayShort: 'Shan', lunch: { recipeId: null }, dinner: { recipeId: null } },
  yakshanba: { dayName: 'Yakshanba', dayShort: 'Yak', lunch: { recipeId: null }, dinner: { recipeId: null } },
};

export function loadStoredIngredients(): IngredientItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INGREDIENTS);
    if (!raw) return DEFAULT_INGREDIENTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_INGREDIENTS;
  } catch (e) {
    console.error('Failed to load ingredients from localStorage', e);
    return DEFAULT_INGREDIENTS;
  }
}

export function saveStoredIngredients(items: IngredientItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save ingredients to localStorage', e);
  }
}

export function loadStoredShoppingList(): ShoppingItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    console.error('Failed to load shopping list from localStorage', e);
    return [];
  }
}

export function saveStoredShoppingList(items: ShoppingItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save shopping list to localStorage', e);
  }
}

export function loadStoredWeeklyPlan(): WeeklyPlan {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WEEKLY_PLAN);
    if (!raw) return DEFAULT_WEEKLY_PLAN;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
    return DEFAULT_WEEKLY_PLAN;
  } catch (e) {
    console.error('Failed to load weekly plan from localStorage', e);
    return DEFAULT_WEEKLY_PLAN;
  }
}

export function saveStoredWeeklyPlan(plan: WeeklyPlan): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WEEKLY_PLAN, JSON.stringify(plan));
  } catch (e) {
    console.error('Failed to save weekly plan to localStorage', e);
  }
}

export function resetAllStorageToDefaults(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(DEFAULT_INGREDIENTS));
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.WEEKLY_PLAN, JSON.stringify(DEFAULT_WEEKLY_PLAN));
  } catch (e) {
    console.error('Failed to reset storage', e);
  }
}
