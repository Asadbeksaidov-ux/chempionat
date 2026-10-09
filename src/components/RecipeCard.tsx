import React, { useState } from 'react';
import { RecipeMatchResult } from '../types';
import { usePantry } from '../context/PantryContext';
import { Clock, Users, CheckCircle2, AlertCircle, PlusCircle, ArrowRight, Sparkles } from 'lucide-react';
import { getRecipeStatusText } from '../utils/matching';

interface RecipeCardProps {
  matchResult: RecipeMatchResult;
  onOpenDetails: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ matchResult, onOpenDetails }) => {
  const { recipe, matchScore, availableCount, totalRequiredCount, missingCount, isReady, missingIngredients } = matchResult;
  const { addMissingIngredientsToShoppingList } = usePantry();
  const [imageError, setImageError] = useState(false);

  const statusText = getRecipeStatusText(missingCount);

  const getScoreColor = (score: number) => {
    if (score === 100) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const getProgressColor = (score: number) => {
    if (score === 100) return 'bg-emerald-600';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-400';
  };

  return (
    <div
      data-testid={`recipe-card-${recipe.id}`}
      className="group bg-white rounded-2xl border border-cream-200 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-cream-200">
        {!imageError ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cream-200 to-cream-300 text-stone-500">
            <span className="text-4xl mb-1">🍲</span>
            <span className="text-xs font-semibold text-stone-600">{recipe.title}</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full bg-white/90 backdrop-blur-md text-stone-800 shadow-sm">
            {recipe.category}
          </span>
        </div>

        {/* Match Percentage Badge */}
        <div className="absolute top-3 right-3">
          <div
            data-testid="recipe-match-score"
            className={`px-3 py-1 rounded-full text-xs font-extrabold border shadow-sm flex items-center gap-1 backdrop-blur-md ${
              isReady
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20'
                : matchScore >= 60
                ? 'bg-amber-500 text-white border-amber-400'
                : 'bg-stone-900/80 text-white border-white/20'
            }`}
          >
            {isReady && <Sparkles className="w-3.5 h-3.5" />}
            <span>{matchScore}% mos</span>
          </div>
        </div>

        {/* Bottom overlay info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Clock className="w-3.5 h-3.5" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Users className="w-3.5 h-3.5" />
            <span>{recipe.servings}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Status Badge */}
          <div className="mb-2">
            <span
              data-testid="recipe-status"
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getScoreColor(
                matchScore
              )}`}
            >
              {isReady ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{statusText}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{statusText}</span>
                </>
              )}
            </span>
          </div>

          {/* Title & Description */}
          <h3
            data-testid="recipe-title"
            onClick={onOpenDetails}
            className="text-lg font-bold text-stone-900 group-hover:text-forest-800 transition-colors cursor-pointer line-clamp-1"
          >
            {recipe.title}
          </h3>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>

          {/* Match Meter */}
          <div className="mt-4 pt-3 border-t border-cream-200">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className="text-stone-600">
                Masalliqlar: <strong className="text-stone-900">{availableCount}</strong> / {totalRequiredCount}
              </span>
              <span className="text-stone-500 font-semibold">{matchScore}%</span>
            </div>
            <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(matchScore)}`}
                style={{ width: `${matchScore}%` }}
              />
            </div>
          </div>

          {/* Missing Ingredients Preview */}
          {missingCount > 0 && (
            <div className="mt-3 flex flex-wrap gap-1 items-center">
              <span className="text-[11px] text-stone-500 font-medium">Yetishmaydi:</span>
              {missingIngredients.slice(0, 3).map((item) => (
                <span
                  key={item.ingredientId}
                  className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 font-medium"
                >
                  {item.name}
                </span>
              ))}
              {missingIngredients.length > 3 && (
                <span className="text-[11px] text-stone-400 font-medium">
                  +{missingIngredients.length - 3} ta
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="mt-5 pt-3 border-t border-cream-200 flex items-center gap-2">
          <button
            data-testid="recipe-view-button"
            onClick={onOpenDetails}
            className="flex-1 py-2 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Retseptni ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {!isReady && (
            <button
              data-testid="recipe-add-missing-button"
              onClick={(e) => {
                e.stopPropagation();
                addMissingIngredientsToShoppingList(recipe);
              }}
              title="Yetishmayotgan masalliqlarni xarid ro‘yxatiga qo‘shish"
              className="p-2 rounded-xl border border-cream-300 text-forest-800 hover:bg-forest-50 hover:border-forest-300 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
