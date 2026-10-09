export type IngredientCategory = 
  | 'sabzavotlar' 
  | 'gosht' 
  | 'don' 
  | 'sut' 
  | 'ziravor' 
  | 'boshqa';

export interface IngredientItem {
  id: string; // e.g., 'eggs', 'tomatoes'
  name: string; // Uzbek name: 'Tuxum', 'Pomidor'
  category: IngredientCategory;
  unit: string; // 'dona', 'kg', 'osh qoshiq', 'ml'
  quantity?: number; // quantity owned
  inStock: boolean; // whether user has it at home
  icon?: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  amount: string; // '3 dona', '200 gr', '2 osh qoshiq'
}

export type RecipeDifficulty = 'Oson' | "O'rtacha" | 'Murakkab';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: RecipeIngredient[];
  prepTime: string; // '20 daqiqa'
  prepMinutes: number;
  difficulty: RecipeDifficulty;
  servings: string; // '2 kishi'
  calories?: string;
  instructions: string[];
  imageUrl: string;
  category: string;
}

export interface RecipeMatchResult {
  recipe: Recipe;
  matchScore: number; // 0 to 100
  availableCount: number;
  totalRequiredCount: number;
  missingCount: number;
  availableIngredients: RecipeIngredient[];
  missingIngredients: RecipeIngredient[];
  isReady: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  recipeSource?: string; // recipe name or 'O\'zim qo\'shdim'
  checked: boolean;
  createdAt: string;
}

export interface MealSlot {
  recipeId: string | null;
}

export interface DayPlan {
  dayName: string;
  dayShort: string;
  lunch: MealSlot;
  dinner: MealSlot;
}

export type WeeklyPlan = Record<string, DayPlan>;

export type RecipeFilterType = 'all' | 'ready' | 'missing-1-2' | 'missing-3-plus';

export type ActiveTab = 'dashboard' | 'recipes' | 'ingredients' | 'shopping' | 'planner';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}
