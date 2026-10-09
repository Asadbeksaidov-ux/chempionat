import React from 'react';
import { usePantry } from '../context/PantryContext';
import { RecipeCard } from './RecipeCard';
import { RecipeFilterType } from '../types';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  ChefHat,
} from 'lucide-react';

export const RecipesPage: React.FC = () => {
  const {
    filteredMatches,
    searchQuery,
    setSearchQuery,
    recipeFilter,
    setRecipeFilter,
    openRecipeModal,
    readyRecipesCount,
    matchedRecipes,
  } = usePantry();

  // Counts for filters
  const allCount = matchedRecipes.length;
  const readyCount = matchedRecipes.filter((r) => r.isReady).length;
  const missing12Count = matchedRecipes.filter(
    (r) => r.missingCount >= 1 && r.missingCount <= 2
  ).length;
  const missing3PlusCount = matchedRecipes.filter((r) => r.missingCount >= 3).length;

  const filterButtons: { id: RecipeFilterType; label: string; count: number; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'Barchasi', count: allCount },
    {
      id: 'ready',
      label: '100% tayyor',
      count: readyCount,
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
    },
    {
      id: 'missing-1-2',
      label: '1–2 ta yetishmaydi',
      count: missing12Count,
      icon: <AlertCircle className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: 'missing-3-plus',
      label: '3+ ta yetishmaydi',
      count: missing3PlusCount,
      icon: <HelpCircle className="w-3.5 h-3.5 text-rose-500" />,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <ChefHat className="w-7 h-7 text-forest-700" />
            <span>Retseptlar katalogi</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Mavjud masalliqlaringiz bo‘yicha hisoblangan retseptlar moslik foizi bo‘yicha tartiblangan
          </p>
        </div>

        {readyRecipesCount > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start md:self-auto">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Hozir tayyorlash mumkin: {readyRecipesCount} ta taom</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cream-200 shadow-soft space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            data-testid="recipes-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Retsept nomi yoki masalliq bo‘yicha qidirish (masalan, tovuq, quymoq, sabzi)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-700 text-xs sm:text-sm text-stone-800 placeholder-stone-400 font-medium transition-all"
          />
          {searchQuery && (
            <button
              data-testid="clear-recipes-search"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-bold"
            >
              Tozalash
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-cream-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Holat:</span>
          </div>

          {filterButtons.map((btn) => {
            const isActive = recipeFilter === btn.id;
            return (
              <button
                key={btn.id}
                data-testid={`filter-${btn.id}`}
                onClick={() => setRecipeFilter(btn.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isActive
                    ? 'bg-forest-800 text-white border-forest-900 shadow-sm'
                    : 'bg-white text-stone-700 border-cream-300 hover:bg-cream-100'
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-forest-700 text-cream-100' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1 font-medium">
        <span>
          Ko‘rsatilmoqda: <strong className="text-stone-800">{filteredMatches.length}</strong> / {allCount} ta retsept
        </span>
        <span className="text-stone-400 hidden sm:inline">
          Moslik darajasi yuqoridan pastga saralangan
        </span>
      </div>

      {/* Grid of Recipe Cards */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMatches.map((match) => (
            <RecipeCard
              key={match.recipe.id}
              matchResult={match}
              onOpenDetails={() => openRecipeModal(match.recipe)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 text-center border border-cream-200 shadow-soft max-w-md mx-auto my-6">
          <div className="w-16 h-16 rounded-2xl bg-cream-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800 mb-1">
            Retseptlar topilmadi
          </h3>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            Qidiruv so‘rovingiz yoki tanlangan filtrga mos keluvchi taom topilmadi. Filtrni o‘zgartirib ko‘ring.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setRecipeFilter('all');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-800 text-white text-xs font-bold hover:bg-forest-900 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Filtrlarni bekor qilish</span>
          </button>
        </div>
      )}
    </div>
  );
};
