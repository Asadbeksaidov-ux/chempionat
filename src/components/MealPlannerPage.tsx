import React from 'react';
import { usePantry } from '../context/PantryContext';
import {
  CalendarDays,
  Utensils,
  Sun,
  Moon,
  ShoppingCart,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { calculateRecipeMatch } from '../utils/matching';

export const MealPlannerPage: React.FC = () => {
  const {
    weeklyPlan,
    updateMealSlot,
    clearWeeklyPlan,
    recipes,
    ingredients,
    generateShoppingListFromWeeklyPlan,
    openRecipeModal,
    setActiveTab,
  } = usePantry();

  const availableSet = new Set<string>(
    ingredients.filter((item) => item.inStock).map((item) => item.id)
  );

  const recipeMap = new Map(recipes.map((r) => [r.id, r]));

  // Days in order
  const dayKeys = [
    'dushanba',
    'seshanba',
    'chorshanba',
    'payshanba',
    'juma',
    'shanba',
    'yakshanba',
  ];

  const handleGenerateShopping = () => {
    generateShoppingListFromWeeklyPlan();
    setActiveTab('shopping');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[11px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Biznes g‘oyasi: Pullik premium xizmat prototipi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <CalendarDays className="w-7 h-7 text-forest-700" />
            <span>Haftalik taomnomani rejalashtirish</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Har bir kunga tushlik va kechki ovqatni tanlang, tizim butun hafta uchun yetishmayotgan xaridlar ro‘yxatini tuzib beradi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <button
            data-testid="clear-weekly-plan-button"
            onClick={clearWeeklyPlan}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl border border-cream-300 text-stone-600 hover:bg-cream-100 hover:text-stone-900 font-bold text-xs transition-all"
            title="Barcha kunlardagi taomlarni tozalash"
          >
            <Trash2 className="w-4 h-4 text-stone-400" />
            <span>Rejani tozalash</span>
          </button>

          <button
            data-testid="generate-weekly-shopping-button"
            onClick={handleGenerateShopping}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm transition-all shadow-soft-md"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Haftalik xarid ro‘yxatini tuzish</span>
          </button>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="meal-planner-grid">
        {dayKeys.map((key) => {
          const day = weeklyPlan[key];
          if (!day) return null;

          const lunchRecipe = day.lunch.recipeId ? recipeMap.get(day.lunch.recipeId) : null;
          const dinnerRecipe = day.dinner.recipeId ? recipeMap.get(day.dinner.recipeId) : null;

          const lunchMatch = lunchRecipe ? calculateRecipeMatch(lunchRecipe, availableSet) : null;
          const dinnerMatch = dinnerRecipe ? calculateRecipeMatch(dinnerRecipe, availableSet) : null;

          return (
            <div
              key={key}
              data-testid={`planner-day-${key}`}
              className="bg-white rounded-2xl border border-cream-200 shadow-soft p-4 flex flex-col justify-between"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cream-200 mb-3">
                <span className="font-extrabold text-stone-900 text-sm">
                  {day.dayName}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-cream-100 text-stone-600">
                  {day.dayShort}
                </span>
              </div>

              {/* Slots */}
              <div className="space-y-3.5">
                {/* Lunch Slot */}
                <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2">
                    <span className="flex items-center gap-1.5 text-amber-700">
                      <Sun className="w-3.5 h-3.5" />
                      <span>Tushlik</span>
                    </span>
                    {lunchRecipe && (
                      <button
                        onClick={() => updateMealSlot(key, 'lunch', null)}
                        className="text-stone-400 hover:text-rose-600 text-[11px]"
                        title="Olib tashlash"
                      >
                        O‘chirish
                      </button>
                    )}
                  </div>

                  <select
                    data-testid={`slot-${key}-lunch-select`}
                    value={day.lunch.recipeId || ''}
                    onChange={(e) => updateMealSlot(key, 'lunch', e.target.value || null)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-cream-300 text-xs font-semibold text-stone-800 focus:outline-none"
                  >
                    <option value="">Taom tanlanmagan</option>
                    {recipes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>

                  {/* Lunch Status */}
                  {lunchMatch && (
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span
                        onClick={() => lunchRecipe && openRecipeModal(lunchRecipe)}
                        className="text-forest-800 font-bold hover:underline cursor-pointer truncate max-w-[140px]"
                      >
                        {lunchRecipe?.title}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded font-bold ${
                          lunchMatch.isReady
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {lunchMatch.matchScore}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Dinner Slot */}
                <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2">
                    <span className="flex items-center gap-1.5 text-indigo-700">
                      <Moon className="w-3.5 h-3.5" />
                      <span>Kechki ovqat</span>
                    </span>
                    {dinnerRecipe && (
                      <button
                        onClick={() => updateMealSlot(key, 'dinner', null)}
                        className="text-stone-400 hover:text-rose-600 text-[11px]"
                        title="Olib tashlash"
                      >
                        O‘chirish
                      </button>
                    )}
                  </div>

                  <select
                    data-testid={`slot-${key}-dinner-select`}
                    value={day.dinner.recipeId || ''}
                    onChange={(e) => updateMealSlot(key, 'dinner', e.target.value || null)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-cream-300 text-xs font-semibold text-stone-800 focus:outline-none"
                  >
                    <option value="">Taom tanlanmagan</option>
                    {recipes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>

                  {/* Dinner Status */}
                  {dinnerMatch && (
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span
                        onClick={() => dinnerRecipe && openRecipeModal(dinnerRecipe)}
                        className="text-forest-800 font-bold hover:underline cursor-pointer truncate max-w-[140px]"
                      >
                        {dinnerRecipe?.title}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded font-bold ${
                          dinnerMatch.isReady
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {dinnerMatch.matchScore}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center flex-shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              Avtomatik ro‘yxat shakllantirish
            </h4>
            <p className="text-xs text-stone-500">
              "Haftalik xarid ro‘yxatini tuzish" tugmasini bosganingizda, butun haftalik taomlar tahlil qilinib, uyda yo‘q masalliqlar bir marta jamlanadi.
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerateShopping}
          className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs whitespace-nowrap shadow-sm"
        >
          Xarid ro‘yxatiga o‘tish
        </button>
      </div>
    </div>
  );
};
