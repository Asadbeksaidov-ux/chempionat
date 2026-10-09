import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  IngredientItem,
  Recipe,
  ShoppingItem,
  WeeklyPlan,
  ActiveTab,
  RecipeFilterType,
  RecipeMatchResult,
  ToastMessage,
  IngredientCategory,
} from '../types';
import { RECIPES_DATA } from '../data/recipes';
import {
  loadStoredIngredients,
  saveStoredIngredients,
  loadStoredShoppingList,
  saveStoredShoppingList,
  loadStoredWeeklyPlan,
  saveStoredWeeklyPlan,
  resetAllStorageToDefaults,
  DEFAULT_WEEKLY_PLAN,
  EMPTY_WEEKLY_PLAN,
} from '../utils/storage';
import { calculateAllRecipeMatches, filterRecipeMatches } from '../utils/matching';
import { DEFAULT_INGREDIENTS } from '../data/defaultIngredients';

interface PantryContextType {
  // State
  ingredients: IngredientItem[];
  shoppingList: ShoppingItem[];
  weeklyPlan: WeeklyPlan;
  recipes: Recipe[];
  activeTab: ActiveTab;
  searchQuery: string;
  recipeFilter: RecipeFilterType;
  selectedRecipeModal: Recipe | null;
  toasts: ToastMessage[];

  // Computed
  matchedRecipes: RecipeMatchResult[];
  filteredMatches: RecipeMatchResult[];
  readyRecipesCount: number;
  availableIngredientsCount: number;
  pendingShoppingCount: number;

  // Setters
  setActiveTab: (tab: ActiveTab) => void;
  setSearchQuery: (query: string) => void;
  setRecipeFilter: (filter: RecipeFilterType) => void;
  openRecipeModal: (recipe: Recipe) => void;
  closeRecipeModal: () => void;

  // Inventory Actions
  toggleIngredient: (id: string) => void;
  updateIngredientQuantity: (id: string, quantity: number) => void;
  addCustomIngredient: (item: { name: string; category: IngredientCategory; unit: string; quantity: number }) => void;
  removeIngredient: (id: string) => void;

  // Shopping List Actions
  addMissingIngredientsToShoppingList: (recipe: Recipe) => { addedCount: number; alreadyPresentCount: number };
  addManualShoppingItem: (name: string, amount: string) => void;
  toggleShoppingItem: (id: string) => void;
  removeShoppingItem: (id: string) => void;
  clearShoppingList: () => void;
  clearCompletedShoppingItems: () => void;

  // Meal Planner Actions
  updateMealSlot: (dayKey: string, slot: 'lunch' | 'dinner', recipeId: string | null) => void;
  clearWeeklyPlan: () => void;
  generateShoppingListFromWeeklyPlan: () => { addedCount: number };

  // System
  resetDemoData: () => void;
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export const PantryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>(() => loadStoredIngredients());
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => loadStoredShoppingList());
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(() => loadStoredWeeklyPlan());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipeFilter, setRecipeFilter] = useState<RecipeFilterType>('all');
  const [selectedRecipeModal, setSelectedRecipeModal] = useState<Recipe | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist ingredients
  useEffect(() => {
    saveStoredIngredients(ingredients);
  }, [ingredients]);

  // Persist shopping list
  useEffect(() => {
    saveStoredShoppingList(shoppingList);
  }, [shoppingList]);

  // Persist weekly plan
  useEffect(() => {
    saveStoredWeeklyPlan(weeklyPlan);
  }, [weeklyPlan]);

  // Toast notifications
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      const newToast: ToastMessage = { id, type, title, message };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  // Computed matching
  const matchedRecipes = useMemo(() => {
    return calculateAllRecipeMatches(RECIPES_DATA, ingredients);
  }, [ingredients]);

  const filteredMatches = useMemo(() => {
    return filterRecipeMatches(matchedRecipes, searchQuery, recipeFilter);
  }, [matchedRecipes, searchQuery, recipeFilter]);

  const readyRecipesCount = useMemo(() => {
    return matchedRecipes.filter((m) => m.isReady).length;
  }, [matchedRecipes]);

  const availableIngredientsCount = useMemo(() => {
    return ingredients.filter((item) => item.inStock).length;
  }, [ingredients]);

  const pendingShoppingCount = useMemo(() => {
    return shoppingList.filter((item) => !item.checked).length;
  }, [shoppingList]);

  // Inventory actions
  const toggleIngredient = useCallback((id: string) => {
    setIngredients((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (!exists) {
        // Defensive addition if ingredient wasn't in inventory list
        return [
          ...prev,
          {
            id,
            name: id,
            category: 'boshqa',
            unit: 'dona',
            quantity: 1,
            inStock: true,
            icon: '🥗',
          },
        ];
      }
      return prev.map((item) => {
        if (item.id === id) {
          const nextStock = !item.inStock;
          return {
            ...item,
            inStock: nextStock,
            quantity: nextStock && (!item.quantity || item.quantity <= 0) ? 1 : item.quantity,
          };
        }
        return item;
      });
    });
  }, []);

  const updateIngredientQuantity = useCallback((id: string, quantity: number) => {
    setIngredients((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const validQty = Math.max(0, quantity);
          return {
            ...item,
            quantity: validQty,
            inStock: validQty > 0 ? true : false,
          };
        }
        return item;
      })
    );
  }, []);

  const addCustomIngredient = useCallback(
    (item: { name: string; category: IngredientCategory; unit: string; quantity: number }) => {
      const cleanName = item.name.trim();
      if (!cleanName) return;

      const slug = cleanName
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '_')
        .replace(/_+/g, '_');
      const uniqueId = `custom_${slug}_${Date.now()}`;

      const newItem: IngredientItem = {
        id: uniqueId,
        name: cleanName,
        category: item.category || 'boshqa',
        unit: item.unit || 'dona',
        quantity: item.quantity > 0 ? item.quantity : 1,
        inStock: true,
        icon: '🥕',
      };

      setIngredients((prev) => [newItem, ...prev]);
      showToast('Masalliq qo‘shildi', `"${cleanName}" oshxona zaxirangizga muvaffaqiyatli qo‘shildi.`);
    },
    [showToast]
  );

  const removeIngredient = useCallback(
    (id: string) => {
      const target = ingredients.find((i) => i.id === id);
      setIngredients((prev) => prev.filter((item) => item.id !== id));
      if (target) {
        showToast('Masalliq o‘chirildi', `"${target.name}" ro‘yxatdan olib tashlandi.`, 'info');
      }
    },
    [ingredients, showToast]
  );

  // Shopping list actions
  const addMissingIngredientsToShoppingList = useCallback(
    (recipe: Recipe) => {
      const availableSet = new Set<string>(
        ingredients.filter((item) => item.inStock).map((item) => item.id)
      );

      const missing = recipe.ingredients.filter((ing) => !availableSet.has(ing.ingredientId));

      if (missing.length === 0) {
        showToast(
          'Barcha masalliqlar mavjud',
          `"${recipe.title}" uchun barcha masalliqlar oshxonangizda bor!`,
          'info'
        );
        return { addedCount: 0, alreadyPresentCount: 0 };
      }

      let addedCount = 0;
      let alreadyPresentCount = 0;

      setShoppingList((prev) => {
        const existingNames = new Set(prev.map((item) => item.name.toLowerCase().trim()));
        const newItems: ShoppingItem[] = [];

        for (const ing of missing) {
          const lowerName = ing.name.toLowerCase().trim();
          if (existingNames.has(lowerName)) {
            alreadyPresentCount++;
          } else {
            addedCount++;
            existingNames.add(lowerName);
            newItems.push({
              id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              name: ing.name,
              amount: ing.amount,
              recipeSource: recipe.title,
              checked: false,
              createdAt: new Date().toISOString(),
            });
          }
        }

        return [...prev, ...newItems];
      });

      if (addedCount > 0) {
        showToast(
          'Xarid ro‘yxatiga qo‘shildi',
          `"${recipe.title}" taomi uchun ${addedCount} ta yetishmayotgan masalliq qo‘shildi.`
        );
      } else {
        showToast(
          'Ro‘yxatda mavjud',
          `Yetishmayotgan barcha masalliqlar xarid ro‘yxatingizda allaqachon bor.`,
          'info'
        );
      }

      return { addedCount, alreadyPresentCount };
    },
    [ingredients, showToast]
  );

  const addManualShoppingItem = useCallback(
    (name: string, amount: string) => {
      const cleanName = name.trim();
      if (!cleanName) return;

      const newItem: ShoppingItem = {
        id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: cleanName,
        amount: amount.trim() || '1 dona',
        recipeSource: 'Qo‘lda qo‘shildi',
        checked: false,
        createdAt: new Date().toISOString(),
      };

      setShoppingList((prev) => [newItem, ...prev]);
      showToast('Qo‘shildi', `"${cleanName}" xarid ro‘yxatiga kiritildi.`);
    },
    [showToast]
  );

  const toggleShoppingItem = useCallback((id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }, []);

  const removeShoppingItem = useCallback((id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearShoppingList = useCallback(() => {
    setShoppingList([]);
    showToast('Tozalandi', 'Xarid ro‘yxati to‘liq tozalandi.', 'info');
  }, [showToast]);

  const clearCompletedShoppingItems = useCallback(() => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
    showToast('Tozalandi', 'Xarid qilingan mahsulotlar ro‘yxatdan olib tashlandi.', 'info');
  }, [showToast]);

  // Meal Planner actions
  const updateMealSlot = useCallback(
    (dayKey: string, slot: 'lunch' | 'dinner', recipeId: string | null) => {
      setWeeklyPlan((prev) => {
        const day = prev[dayKey];
        if (!day) return prev;
        return {
          ...prev,
          [dayKey]: {
            ...day,
            [slot]: { recipeId },
          },
        };
      });
      showToast('Reja yangilandi', 'Haftalik taomnomaga o‘zgartirish kiritildi.');
    },
    [showToast]
  );

  const clearWeeklyPlan = useCallback(() => {
    setWeeklyPlan(EMPTY_WEEKLY_PLAN);
    showToast('Reja tozalandi', 'Haftalik taomnoma to‘liq tozalandi.', 'info');
  }, [showToast]);

  const generateShoppingListFromWeeklyPlan = useCallback(() => {
    const recipeMap = new Map<string, Recipe>(RECIPES_DATA.map((r) => [r.id, r]));
    const availableSet = new Set<string>(
      ingredients.filter((item) => item.inStock).map((item) => item.id)
    );

    // Collect all unique planned recipes
    const plannedRecipeIds = new Set<string>();
    Object.values(weeklyPlan).forEach((day) => {
      if (day.lunch.recipeId) plannedRecipeIds.add(day.lunch.recipeId);
      if (day.dinner.recipeId) plannedRecipeIds.add(day.dinner.recipeId);
    });

    if (plannedRecipeIds.size === 0) {
      showToast('Reja bo‘sh', 'Avval haftalik taomnomaga biror taom tanlang.', 'warning');
      return { addedCount: 0 };
    }

    let addedCount = 0;
    setShoppingList((prev) => {
      const existingNames = new Set(prev.map((item) => item.name.toLowerCase().trim()));
      const newItems: ShoppingItem[] = [];

      plannedRecipeIds.forEach((rId) => {
        const recipe = recipeMap.get(rId);
        if (!recipe) return;

        recipe.ingredients.forEach((ing) => {
          // If not in pantry stock
          if (!availableSet.has(ing.ingredientId)) {
            const lowerName = ing.name.toLowerCase().trim();
            if (!existingNames.has(lowerName)) {
              existingNames.add(lowerName);
              addedCount++;
              newItems.push({
                id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                name: ing.name,
                amount: ing.amount,
                recipeSource: `Haftalik reja (${recipe.title})`,
                checked: false,
                createdAt: new Date().toISOString(),
              });
            }
          }
        });
      });

      return [...prev, ...newItems];
    });

    if (addedCount > 0) {
      showToast(
        'Haftalik xarid rejalashtirildi',
        `Haftalik taomnoma asosida ${addedCount} ta yetishmayotgan masalliq ro‘yxatga qo‘shildi!`
      );
    } else {
      showToast(
        'Barcha masalliqlar mavjud',
        'Haftalik rejadagi barcha taomlar uchun masalliqlar allaqachon oshxonangizda yoki xarid ro‘yxatingizda bor!',
        'info'
      );
    }

    return { addedCount };
  }, [ingredients, weeklyPlan, showToast]);

  // Reset to demo
  const resetDemoData = useCallback(() => {
    resetAllStorageToDefaults();
    setIngredients(DEFAULT_INGREDIENTS);
    setShoppingList([]);
    setWeeklyPlan(DEFAULT_WEEKLY_PLAN);
    setSearchQuery('');
    setRecipeFilter('all');
    showToast('Demo ma’lumotlar tiklandi', 'Barcha namunaviy holat qayta tiklandi.', 'info');
  }, [showToast]);

  const openRecipeModal = useCallback((recipe: Recipe) => {
    setSelectedRecipeModal(recipe);
  }, []);

  const closeRecipeModal = useCallback(() => {
    setSelectedRecipeModal(null);
  }, []);

  return (
    <PantryContext.Provider
      value={{
        ingredients,
        shoppingList,
        weeklyPlan,
        recipes: RECIPES_DATA,
        activeTab,
        searchQuery,
        recipeFilter,
        selectedRecipeModal,
        toasts,
        matchedRecipes,
        filteredMatches,
        readyRecipesCount,
        availableIngredientsCount,
        pendingShoppingCount,
        setActiveTab,
        setSearchQuery,
        setRecipeFilter,
        openRecipeModal,
        closeRecipeModal,
        toggleIngredient,
        updateIngredientQuantity,
        addCustomIngredient,
        removeIngredient,
        addMissingIngredientsToShoppingList,
        addManualShoppingItem,
        toggleShoppingItem,
        removeShoppingItem,
        clearShoppingList,
        clearCompletedShoppingItems,
        updateMealSlot,
        clearWeeklyPlan,
        generateShoppingListFromWeeklyPlan,
        resetDemoData,
        showToast,
        removeToast,
      }}
    >
      {children}
    </PantryContext.Provider>
  );
};

export const usePantry = (): PantryContextType => {
  const context = useContext(PantryContext);
  if (!context) {
    throw new Error('usePantry must be used within a PantryProvider');
  }
  return context;
};
