import React, { useEffect, useState } from 'react';
import { usePantry } from '../context/PantryContext';
import {
  X,
  Clock,
  Users,
  Flame,
  CheckCircle2,
  AlertCircle,
  ShoppingCart,
  Check,
  ChefHat,
  Sparkles,
} from 'lucide-react';
import { calculateRecipeMatch, getRecipeStatusText } from '../utils/matching';

export const RecipeModal: React.FC = () => {
  const {
    selectedRecipeModal: recipe,
    closeRecipeModal,
    ingredients,
    toggleIngredient,
    addMissingIngredientsToShoppingList,
  } = usePantry();

  const [modalImageError, setModalImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRecipeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeRecipeModal]);

  if (!recipe) return null;

  const availableSet = new Set<string>(
    ingredients.filter((item) => item.inStock).map((item) => item.id)
  );

  const matchResult = calculateRecipeMatch(recipe, availableSet);
  const { matchScore, isReady, missingCount } = matchResult;
  const statusText = getRecipeStatusText(missingCount);

  const handleAddMissing = () => {
    addMissingIngredientsToShoppingList(recipe);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={closeRecipeModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        data-testid="recipe-modal"
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-cream-200 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-60 sm:h-72 w-full bg-cream-200 flex-shrink-0">
          {!modalImageError ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
              onError={() => setModalImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cream-300 to-forest-100 text-stone-600">
              <span className="text-5xl mb-2">🍲</span>
              <span className="text-sm font-bold">{recipe.title}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            data-testid="modal-close-button"
            onClick={closeRecipeModal}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Match in Hero */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                {recipe.category}
              </span>
              <span
                data-testid="modal-match-badge"
                className={`text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm ${
                  isReady
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-500 text-white'
                }`}
              >
                {isReady ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                <span>{matchScore}% mos — {statusText}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" data-testid="modal-title">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-cream-100 rounded-2xl border border-cream-200">
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="w-4 h-4 text-forest-700 mb-1" />
              <span className="text-[11px] text-stone-500 font-medium">Tayyorlash</span>
              <span className="text-xs sm:text-sm font-bold text-stone-900">{recipe.prepTime}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-x border-cream-300">
              <Users className="w-4 h-4 text-forest-700 mb-1" />
              <span className="text-[11px] text-stone-500 font-medium">Porsiya</span>
              <span className="text-xs sm:text-sm font-bold text-stone-900">{recipe.servings}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Flame className="w-4 h-4 text-forest-700 mb-1" />
              <span className="text-[11px] text-stone-500 font-medium">Murakkablik</span>
              <span className="text-xs sm:text-sm font-bold text-stone-900">{recipe.difficulty}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-stone-700 leading-relaxed font-normal">
              {recipe.description}
            </p>
          </div>

          {/* Ingredients Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>Kerakli masalliqlar</span>
                <span className="text-xs font-semibold text-stone-500">
                  ({matchResult.availableCount}/{matchResult.totalRequiredCount} mavjud)
                </span>
              </h3>
              <span className="text-xs text-stone-400">
                (Bor bo‘lsa belgilang)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recipe.ingredients.map((ing) => {
                const isAvailable = availableSet.has(ing.ingredientId);
                return (
                  <div
                    key={ing.ingredientId}
                    onClick={() => toggleIngredient(ing.ingredientId)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isAvailable
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 hover:bg-emerald-50'
                        : 'bg-amber-50/70 border-amber-300 text-amber-950 hover:bg-amber-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isAvailable
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-amber-400 bg-white text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold">{ing.name}</span>
                        <div className="text-[11px] font-medium opacity-80">
                          {isAvailable ? 'Uyda mavjud' : 'Yetishmaydi'}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-white/80 border border-black/5 shadow-2xs">
                      {ing.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cooking Instructions */}
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-forest-700" />
              <span>Bosqichma-bosqich tayyorlash</span>
            </h3>
            <ol className="space-y-3">
              {recipe.instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-cream-50 border border-cream-200"
                >
                  <span className="w-6 h-6 rounded-full bg-forest-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-stone-800 leading-relaxed pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-cream-200 bg-cream-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-600 w-full sm:w-auto text-center sm:text-left">
            {isReady ? (
              <span className="text-emerald-700 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-4 h-4" /> Barcha masalliqlar tayyor! Pishirishni boshlashingiz mumkin.
              </span>
            ) : (
              <span>
                Yetishmayotgan masalliqlar: <strong className="text-amber-700 font-bold">{missingCount} ta</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={closeRecipeModal}
              className="px-4 py-2.5 rounded-xl border border-cream-300 text-stone-700 font-semibold text-xs hover:bg-white transition-colors flex-1 sm:flex-initial text-center"
            >
              Yopish
            </button>

            {!isReady ? (
              <button
                data-testid="modal-add-to-shopping-list"
                aria-label="Xarid ro‘yxatiga qo‘shish"
                onClick={handleAddMissing}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm flex-1 sm:flex-initial"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Xarid ro‘yxatiga qo‘shish</span>
                {missingCount > 0 && <span className="text-[11px] opacity-90">({missingCount})</span>}
              </button>
            ) : (
              <button
                data-testid="modal-cook-button"
                onClick={closeRecipeModal}
                className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm flex-1 sm:flex-initial"
              >
                <ChefHat className="w-4 h-4" />
                <span>Tayyorlashga kirishish</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
