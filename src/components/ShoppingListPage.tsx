import React, { useState } from 'react';
import { usePantry } from '../context/PantryContext';
import {
  ShoppingCart,
  Plus,
  Trash2,
  Check,
  ChefHat,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const ShoppingListPage: React.FC = () => {
  const {
    shoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearShoppingList,
    clearCompletedShoppingItems,
    addManualShoppingItem,
    recipes,
    addMissingIngredientsToShoppingList,
    setActiveTab,
  } = usePantry();

  const [manualName, setManualName] = useState('');
  const [manualAmount, setManualAmount] = useState('');
  const [selectedRecipeToAdd, setSelectedRecipeToAdd] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [filterView, setFilterView] = useState<'all' | 'pending' | 'completed'>('all');

  const pendingItems = shoppingList.filter((item) => !item.checked);
  const completedItems = shoppingList.filter((item) => item.checked);

  const displayedItems = shoppingList.filter((item) => {
    if (filterView === 'pending') return !item.checked;
    if (filterView === 'completed') return item.checked;
    return true;
  });

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;
    addManualShoppingItem(manualName.trim(), manualAmount.trim() || '1 dona');
    setManualName('');
    setManualAmount('');
  };

  const handleAddFromRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecipeToAdd) return;
    const targetRecipe = recipes.find((r) => r.id === selectedRecipeToAdd);
    if (targetRecipe) {
      addMissingIngredientsToShoppingList(targetRecipe);
      setSelectedRecipeToAdd('');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <ShoppingCart className="w-7 h-7 text-forest-700" />
            <span>Xarid ro‘yxati</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Yetishmayotgan masalliqlarni do‘konga borganingizda belgilab boring va ortiqcha xarajat qilmang
          </p>
        </div>

        {/* Counter Badge & Clear action */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="px-4 py-2 rounded-2xl bg-amber-500 text-white shadow-soft flex items-center gap-2">
            <span className="text-xs font-bold">
              Qolgan xaridlar: <strong className="text-white text-sm font-extrabold">{pendingItems.length}</strong> ta
            </span>
          </div>

          {completedItems.length > 0 && (
            <button
              data-testid="clear-completed-shopping-button"
              onClick={clearCompletedShoppingItems}
              className="px-3 py-2 rounded-2xl border border-cream-300 text-stone-600 hover:bg-cream-100 text-xs font-bold transition-colors"
              title="Sotib olinganlarni ro‘yxatdan chiqarish"
            >
              Sotib olinganlarni tozalash ({completedItems.length})
            </button>
          )}

          {shoppingList.length > 0 && (
            <button
              data-testid="clear-shopping-list-button"
              onClick={() => setShowClearConfirm(true)}
              className="p-2.5 rounded-2xl border border-cream-300 text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
              title="Barcha ro‘yxatni tozalash"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Add Forms: From Recipe & Manual Add */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Form 1: Add from Recipe */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft">
          <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-forest-700" />
            <span>Retsept bo‘yicha yetishmaganlarni qo‘shish</span>
          </h3>
          <p className="text-xs text-stone-500 mb-3">
            Tanlangan taom uchun faqat uyingizda yo‘q bo‘lgan masalliqlar avtomatik qo‘shiladi:
          </p>
          <form onSubmit={handleAddFromRecipe} className="flex gap-2">
            <select
              data-testid="shopping-recipe-select"
              value={selectedRecipeToAdd}
              onChange={(e) => setSelectedRecipeToAdd(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
            >
              <option value="">Retseptni tanlang...</option>
              {recipes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
            <button
              type="submit"
              data-testid="shopping-recipe-add-button"
              disabled={!selectedRecipeToAdd}
              className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Qo‘shish</span>
            </button>
          </form>
        </div>

        {/* Form 2: Manual Add Item */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft">
          <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Plus className="w-4 h-4 text-forest-700" />
            <span>Boshqa mahsulotni qo‘lda kiritish</span>
          </h3>
          <p className="text-xs text-stone-500 mb-3">
            Oshxona uchun kerakli boshqa har qanday xarid bandini yozing:
          </p>
          <form onSubmit={handleManualAdd} className="flex gap-2">
            <input
              type="text"
              data-testid="shopping-manual-name"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="Mahsulot nomi (masalan, non)..."
              className="flex-1 px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-forest-600/30"
            />
            <input
              type="text"
              data-testid="shopping-manual-amount"
              value={manualAmount}
              onChange={(e) => setManualAmount(e.target.value)}
              placeholder="Miqdor (2 dona)"
              className="w-24 sm:w-28 px-2 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-stone-800"
            />
            <button
              type="submit"
              data-testid="shopping-manual-add-button"
              disabled={!manualName.trim()}
              className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-white text-xs font-bold transition-colors shadow-sm flex-shrink-0"
            >
              Qo‘shish
            </button>
          </form>
        </div>
      </div>

      {/* Filter Tabs */}
      {shoppingList.length > 0 && (
        <div className="flex items-center justify-between border-b border-cream-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterView('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterView === 'all'
                  ? 'bg-forest-800 text-white'
                  : 'bg-white text-stone-600 border border-cream-300 hover:bg-cream-100'
              }`}
            >
              Barchasi ({shoppingList.length})
            </button>
            <button
              onClick={() => setFilterView('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterView === 'pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-stone-600 border border-cream-300 hover:bg-cream-100'
              }`}
            >
              Kutilmoqda ({pendingItems.length})
            </button>
            <button
              onClick={() => setFilterView('completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterView === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-stone-600 border border-cream-300 hover:bg-cream-100'
              }`}
            >
              Sotib olindi ({completedItems.length})
            </button>
          </div>

          <span className="text-xs text-stone-500 font-medium hidden sm:inline">
            Olingan narsalarni ustiga bosib belgilang
          </span>
        </div>
      )}

      {/* Shopping List Items */}
      {displayedItems.length > 0 ? (
        <div className="space-y-2.5">
          {displayedItems.map((item) => {
            return (
              <div
                key={item.id}
                data-testid={`shopping-item-${item.id}`}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-150 ${
                  item.checked
                    ? 'bg-stone-50 border-stone-200 opacity-60'
                    : 'bg-white border-cream-200 shadow-soft hover:shadow-soft-md'
                }`}
              >
                {/* Checkbox and Label */}
                <div
                  onClick={() => toggleShoppingItem(item.id)}
                  className="flex items-center gap-3.5 cursor-pointer flex-1"
                >
                  <div
                    data-testid={`shopping-item-checkbox-${item.id}`}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                      item.checked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 bg-white hover:border-forest-600 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>

                  <div>
                    <span
                      className={`text-sm font-bold block ${
                        item.checked
                          ? 'line-through text-stone-400'
                          : 'text-stone-900'
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.recipeSource && (
                      <span className="text-[11px] text-stone-400 font-medium">
                        Manba: {item.recipeSource}
                      </span>
                    )}
                  </div>
                </div>

                {/* Amount and delete */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      item.checked
                        ? 'bg-stone-200 text-stone-500'
                        : 'bg-cream-100 text-forest-900 border border-cream-300'
                    }`}
                  >
                    {item.amount}
                  </span>

                  <button
                    data-testid={`shopping-item-delete-${item.id}`}
                    onClick={() => removeShoppingItem(item.id)}
                    title="O‘chirish"
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 text-center border border-cream-200 shadow-soft max-w-md mx-auto my-6">
          <div className="w-16 h-16 rounded-2xl bg-cream-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800 mb-1">
            Xarid ro‘yxati bo‘sh
          </h3>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            Retseptlar sahifasiga o‘tib, yetishmayotgan masalliqlarni qo‘shing yoki yuqoridagi maydon orqali o‘zingiz kiritishingiz mumkin.
          </p>
          <button
            onClick={() => setActiveTab('recipes')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold hover:bg-forest-900 transition-colors shadow-sm"
          >
            <span>Retseptlarni ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Clear List Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-cream-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              Ro‘yxat tozalansinmi?
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              Xarid ro‘yxatidagi barcha {shoppingList.length} ta mahsulot o‘chiriladi. Bu amalni qaytarib bo‘lmaydi.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  clearShoppingList();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm"
              >
                Ha, barchasini tozalash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
