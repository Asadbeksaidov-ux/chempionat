import React from 'react';
import { usePantry } from '../context/PantryContext';
import { RecipeCard } from './RecipeCard';
import {
  Search,
  Refrigerator,
  CheckCircle2,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  Plus,
  UtensilsCrossed,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    ingredients,
    toggleIngredient,
    matchedRecipes,
    readyRecipesCount,
    availableIngredientsCount,
    pendingShoppingCount,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    openRecipeModal,
    setRecipeFilter,
  } = usePantry();

  // Top recommended recipes (first 4)
  const topRecommendations = matchedRecipes.slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('recipes');
  };

  const handleExploreReady = () => {
    setRecipeFilter('ready');
    setActiveTab('recipes');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700 text-white p-6 sm:p-10 shadow-soft-lg">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-forest-600/30 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Oshxonadagi isrofgarchilikka barham bering</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Uyda bor masalliqlardan <br className="hidden sm:inline" />
            <span className="text-amber-300">mazali taomlar</span> toping
          </h1>

          <p className="text-sm sm:text-base text-cream-200 mb-6 font-normal leading-relaxed">
            Muzlatgichingizdagi mahsulotlarni tanlang — Smart Pantry sizga hoziroq tayyorlash mumkin bo‘lgan retseptlarni saralab ko‘rsatadi va xarid xarajatlaringizni tejaydi.
          </p>

          {/* Search Bar Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-white/30 max-w-xl text-stone-800"
          >
            <div className="pl-3 text-stone-400">
              <Search className="w-5 h-5 text-forest-700" />
            </div>
            <input
              type="text"
              data-testid="search-input"
              aria-label="Qanday taom tayyorlamoqchisiz?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Qanday taom tayyorlamoqchisiz?"
              className="w-full bg-transparent border-none focus:outline-none text-xs sm:text-sm px-2 text-stone-900 placeholder-stone-400 font-medium"
            />
            <button
              type="submit"
              data-testid="search-button"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm transition-colors flex-shrink-0 shadow-sm"
            >
              Qidirish
            </button>
          </form>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Available ingredients */}
        <div
          data-testid="stat-ingredients"
          onClick={() => setActiveTab('ingredients')}
          className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft hover:shadow-soft-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Mavjud masalliqlar
            </span>
            <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Refrigerator className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900" data-testid="count-available-ingredients">
              {availableIngredientsCount}
            </span>
            <span className="text-xs text-stone-500 font-medium">xil mahsulot</span>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-forest-700 group-hover:translate-x-1 transition-transform">
            <span>Zaxirani boshqarish</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 2: Ready recipes */}
        <div
          data-testid="stat-ready-recipes"
          onClick={handleExploreReady}
          className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft hover:shadow-soft-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Tayyor taomlar
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-800" data-testid="count-ready-recipes">
              {readyRecipesCount}
            </span>
            <span className="text-xs text-stone-500 font-medium">ta 100% tayyor</span>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
            <span>Tayyorlashni ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 3: Shopping list */}
        <div
          data-testid="stat-shopping-items"
          onClick={() => setActiveTab('shopping')}
          className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft hover:shadow-soft-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Xarid ro‘yxati
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900" data-testid="count-pending-shopping">
              {pendingShoppingCount}
            </span>
            <span className="text-xs text-stone-500 font-medium">ta xarid bandi</span>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
            <span>Ro‘yxatni ochish</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 4: Meal Planner CTA */}
        <div
          data-testid="stat-meal-planner"
          onClick={() => setActiveTab('planner')}
          className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft hover:shadow-soft-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Haftalik taomnoma
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900">7</span>
            <span className="text-xs text-stone-500 font-medium">kunlik reja</span>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
            <span>Rejani tuzish</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>

      {/* Quick Pantry Toggle Section */}
      <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Refrigerator className="w-5 h-5 text-forest-700" />
              <span>Oshxonadagi tezkor tanlov</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Uyda bor mahsulotlarni bosing — retseptlar darhol qayta hisoblanadi:
            </p>
          </div>
          <button
            onClick={() => setActiveTab('ingredients')}
            className="text-xs font-bold text-forest-800 hover:text-forest-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Barcha masalliqlar ({ingredients.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Chips */}
        <div className="flex flex-wrap gap-2">
          {ingredients.slice(0, 12).map((item) => (
            <button
              key={item.id}
              onClick={() => toggleIngredient(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                item.inStock
                  ? 'bg-forest-800 text-white border-forest-900 shadow-sm scale-102'
                  : 'bg-cream-100 text-stone-700 border-cream-300 hover:bg-cream-200'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  item.inStock ? 'bg-forest-700 text-emerald-200' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {item.inStock ? 'Bor' : 'Yo‘q'}
              </span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab('ingredients')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-forest-400 text-forest-800 hover:bg-forest-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yana qo‘shish</span>
          </button>
        </div>
      </div>

      {/* Recommended Recipes Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-forest-700" />
              <span>Siz uchun tavsiya etilgan retseptlar</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Mavjud masalliqlaringiz moslik darajasi bo‘yicha saralangan
            </p>
          </div>

          <button
            onClick={() => {
              setRecipeFilter('all');
              setActiveTab('recipes');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 text-xs font-bold hover:bg-forest-100 transition-colors self-start sm:self-auto"
          >
            <span>Barcha 8 ta retseptni ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRecommendations.map((match) => (
            <RecipeCard
              key={match.recipe.id}
              matchResult={match}
              onOpenDetails={() => openRecipeModal(match.recipe)}
            />
          ))}
        </div>
      </div>

      {/* Value Proposition / Food Waste Teaser */}
      <div className="bg-gradient-to-r from-cream-200 via-cream-100 to-forest-50 rounded-3xl p-6 sm:p-8 border border-cream-300 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-forest-800 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Tejamkorlik va tartib</span>
          </div>
          <h3 className="text-xl font-extrabold text-stone-900 mb-2">
            Har oy 30% gacha oziq-ovqat xarajatlarini tejang
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Avval uydagi bor mahsulotlarni ishlatib taom tayyorlash orqali oilaviy byudjetingiz tejaladi va ortiqcha xarid qilinmaydi. Haftalik taom rejasini tuzib, aniq ro‘yxat bilan do‘konga chiqing!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('planner')}
            className="px-5 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs transition-colors shadow-sm text-center"
          >
            Haftalik reja tuzish
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className="px-5 py-3 rounded-xl bg-white border border-cream-300 text-stone-800 font-bold text-xs hover:bg-cream-50 transition-colors shadow-2xs text-center"
          >
            Masalliqlarni to‘ldirish
          </button>
        </div>
      </div>
    </div>
  );
};
