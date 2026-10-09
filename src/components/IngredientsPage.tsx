import React, { useState } from 'react';
import { usePantry } from '../context/PantryContext';
import { IngredientCategory } from '../types';
import { CATEGORY_LABELS } from '../data/defaultIngredients';
import {
  Refrigerator,
  Search,
  Plus,
  Trash2,
  Check,
  CheckCheck,
  XCircle,
  Filter,
  Sparkles,
} from 'lucide-react';

export const IngredientsPage: React.FC = () => {
  const {
    ingredients,
    toggleIngredient,
    updateIngredientQuantity,
    addCustomIngredient,
    removeIngredient,
    availableIngredientsCount,
    setActiveTab,
  } = usePantry();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // New ingredient form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<IngredientCategory>('sabzavotlar');
  const [newUnit, setNewUnit] = useState('dona');
  const [newQty, setNewQty] = useState(1);

  // Filtered ingredients
  const filteredIngredients = ingredients.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addCustomIngredient({
      name: newName.trim(),
      category: newCategory,
      unit: newUnit.trim() || 'dona',
      quantity: Number(newQty) || 1,
    });

    setNewName('');
    setNewQty(1);
    setShowAddForm(false);
  };

  const handleSelectAll = () => {
    ingredients.forEach((item) => {
      if (!item.inStock) {
        toggleIngredient(item.id);
      }
    });
  };

  const handleDeselectAll = () => {
    ingredients.forEach((item) => {
      if (item.inStock) {
        toggleIngredient(item.id);
      }
    });
  };

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'sabzavotlar', label: 'Sabzavotlar' },
    { id: 'gosht', label: 'Go‘sht' },
    { id: 'don', label: 'Don & Makaron' },
    { id: 'sut', label: 'Sut mahsulotlari' },
    { id: 'ziravor', label: 'Yog‘ & Ziravor' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <Refrigerator className="w-7 h-7 text-forest-700" />
            <span>Mening masalliqlarim</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Uyda bor mahsulotlarni belgilang. Qancha ko‘p masalliq tanlasangiz, shuncha ko‘p taom taklif etiladi.
          </p>
        </div>

        {/* Selected Counter & CTA */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-forest-800 text-white shadow-soft flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold">
              Mavjud: <strong className="text-cream-100 text-sm font-extrabold" data-testid="total-selected-ingredients">{availableIngredientsCount}</strong> / {ingredients.length}
            </span>
          </div>

          <button
            onClick={() => setActiveTab('recipes')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mos taomlarni ko‘rish</span>
          </button>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cream-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              data-testid="ingredient-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Masalliq nomini qidiring (masalan, go‘sht, tuxum)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-700 text-xs sm:text-sm text-stone-800 placeholder-stone-400 font-medium transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              data-testid="open-add-ingredient-form"
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi masalliq qo‘shish</span>
            </button>

            <button
              data-testid="select-all-ingredients"
              onClick={handleSelectAll}
              title="Barchasini mavjud deb belgilash"
              className="p-2.5 rounded-xl border border-cream-300 text-stone-700 hover:bg-cream-100 text-xs font-semibold"
            >
              <CheckCheck className="w-4 h-4 text-emerald-700" />
            </button>

            <button
              data-testid="deselect-all-ingredients"
              onClick={handleDeselectAll}
              title="Barcha belgilarni tozalash"
              className="p-2.5 rounded-xl border border-cream-300 text-stone-700 hover:bg-cream-100 text-xs font-semibold"
            >
              <XCircle className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-cream-100 text-xs font-medium no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-stone-400 mr-1 flex-shrink-0" />
          {categories.map((c) => {
            const isCatActive = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isCatActive
                    ? 'bg-forest-800 text-white shadow-2xs'
                    : 'bg-cream-100 text-stone-700 hover:bg-cream-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Custom Ingredient Form Modal/Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleCreateIngredient}
          className="bg-cream-50 p-5 rounded-2xl border-2 border-dashed border-forest-300 space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-forest-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-forest-700" />
              <span>Yangi masalliq qo‘shish</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-stone-500 hover:text-stone-800 font-semibold"
            >
              Yopish
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Masalliq nomi *
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Masalan, Ko‘katlar, Qatiq, Sarimsoq..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Kategoriya
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as IngredientCategory)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-stone-800 focus:outline-none"
              >
                <option value="sabzavotlar">Sabzavotlar</option>
                <option value="gosht">Go‘sht mahsulotlari</option>
                <option value="don">Don & Un</option>
                <option value="sut">Sut mahsulotlari</option>
                <option value="ziravor">Yog‘ & Ziravorlar</option>
                <option value="boshqa">Boshqalar</option>
              </select>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Miqdor & birlik
                </label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    min="1"
                    value={newQty}
                    onChange={(e) => setNewQty(Number(e.target.value))}
                    className="w-16 px-2 py-2 rounded-xl bg-white border border-cream-300 text-xs text-stone-800 text-center"
                  />
                  <input
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    placeholder="kg / dona"
                    className="flex-1 px-2 py-2 rounded-xl bg-white border border-cream-300 text-xs text-stone-800"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 rounded-xl border border-cream-300 text-stone-600 text-xs font-semibold hover:bg-white"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-sm"
            >
              Saqlash va qo‘shish
            </button>
          </div>
        </form>
      )}

      {/* Ingredients Grid / Interactive Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filteredIngredients.map((item) => {
          const isSelected = item.inStock;
          return (
            <div
              key={item.id}
              data-testid={`ingredient-item-${item.id}`}
              className={`relative rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-forest-600 ring-2 ring-forest-600/20 shadow-soft'
                  : 'bg-white/70 border-cream-200 opacity-80 hover:opacity-100 hover:bg-white shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                {/* Main clickable toggle */}
                <div
                  onClick={() => toggleIngredient(item.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                      isSelected
                        ? 'bg-forest-50 border border-forest-200 scale-105'
                        : 'bg-cream-100 border border-cream-200 text-stone-400'
                    }`}
                  >
                    {item.icon || '🥗'}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-stone-900 leading-snug">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {CATEGORY_LABELS[item.category] || item.category}
                    </span>
                  </div>
                </div>

                {/* Checkbox toggle */}
                <button
                  data-testid={`ingredient-checkbox-${item.id}`}
                  onClick={() => toggleIngredient(item.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-forest-800 border-forest-800 text-white shadow-2xs'
                      : 'border-stone-300 bg-white hover:border-forest-600 text-transparent'
                  }`}
                  aria-label={`${item.name}ni tanlash`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

              {/* Bottom controls: Quantity adjustment & remove */}
              <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-xs">
                {/* Quantity stepper */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-stone-500 font-medium">Miqdor:</span>
                  <div className="flex items-center bg-cream-100 rounded-lg border border-cream-200 px-1 py-0.5">
                    <button
                      data-testid={`ingredient-dec-${item.id}`}
                      onClick={() =>
                        updateIngredientQuantity(item.id, Math.max(0, (item.quantity || 1) - 1))
                      }
                      className="w-5 h-5 flex items-center justify-center rounded text-stone-600 hover:bg-cream-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-1.5 text-xs font-bold text-stone-800 min-w-[20px] text-center" data-testid={`ingredient-qty-${item.id}`}>
                      {item.quantity || 0}
                    </span>
                    <button
                      data-testid={`ingredient-inc-${item.id}`}
                      onClick={() =>
                        updateIngredientQuantity(item.id, (item.quantity || 0) + 1)
                      }
                      className="w-5 h-5 flex items-center justify-center rounded text-stone-600 hover:bg-cream-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-stone-500 font-semibold">{item.unit}</span>
                </div>

                {/* Remove button (especially for custom items or any item) */}
                <button
                  data-testid={`ingredient-delete-${item.id}`}
                  onClick={() => removeIngredient(item.id)}
                  title="Masalliqni butunlay o‘chirish"
                  className="text-stone-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredIngredients.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center border border-cream-200 shadow-soft max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-cream-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800 mb-1">Masalliq topilmadi</h3>
          <p className="text-xs text-stone-500 mb-5 leading-relaxed">
            "{searchQuery}" so‘rovi bo‘yicha masalliq topilmadi. O‘zingiz yangi masalliq sifatida qo‘shishingiz mumkin.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 rounded-xl bg-forest-800 text-white text-xs font-bold hover:bg-forest-900 transition-colors shadow-sm"
          >
            Yangi masalliq qo‘shish
          </button>
        </div>
      )}
    </div>
  );
};
