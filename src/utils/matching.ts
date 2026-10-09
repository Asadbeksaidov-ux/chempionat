import { Recipe, IngredientItem, RecipeMatchResult, RecipeFilterType } from '../types';

/**
 * Calculates recipe match based on available ingredients in the pantry.
 * Formula: (available ingredient count / total distinct required ingredient count) * 100
 */
export function calculateRecipeMatch(
  recipe: Recipe,
  availableIngredientIds: Set<string>
): RecipeMatchResult {
  const distinctIngredients = recipe.ingredients;
  const totalRequiredCount = distinctIngredients.length;

  if (totalRequiredCount === 0) {
    return {
      recipe,
      matchScore: 0,
      availableCount: 0,
      totalRequiredCount: 0,
      missingCount: 0,
      availableIngredients: [],
      missingIngredients: [],
      isReady: false,
    };
  }

  const availableIngredients = distinctIngredients.filter((ing) =>
    availableIngredientIds.has(ing.ingredientId)
  );

  const missingIngredients = distinctIngredients.filter(
    (ing) => !availableIngredientIds.has(ing.ingredientId)
  );

  const availableCount = availableIngredients.length;
  const missingCount = missingIngredients.length;
  const matchScore = Math.round((availableCount / totalRequiredCount) * 100);
  const isReady = missingCount === 0;

  return {
    recipe,
    matchScore,
    availableCount,
    totalRequiredCount,
    missingCount,
    availableIngredients,
    missingIngredients,
    isReady,
  };
}

/**
 * Evaluates all recipes against user pantry, sorted by match percentage desc by default.
 */
export function calculateAllRecipeMatches(
  recipes: Recipe[],
  ingredients: IngredientItem[]
): RecipeMatchResult[] {
  // Only consider items that are marked as inStock
  const availableSet = new Set<string>(
    ingredients.filter((item) => item.inStock).map((item) => item.id)
  );

  const results = recipes.map((recipe) =>
    calculateRecipeMatch(recipe, availableSet)
  );

  // Sort descending by match percentage, then ascending by preparation time
  return results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return a.recipe.prepMinutes - b.recipe.prepMinutes;
  });
}

/**
 * Filters match results by search query and category/missing filter
 */
export function filterRecipeMatches(
  matches: RecipeMatchResult[],
  query: string,
  filterType: RecipeFilterType
): RecipeMatchResult[] {
  const normalizedQuery = query.toLowerCase().trim();

  return matches.filter((item) => {
    // 1. Search Query filter (matches recipe title, description, or ingredient name)
    if (normalizedQuery) {
      const matchTitle = item.recipe.title.toLowerCase().includes(normalizedQuery);
      const matchDesc = item.recipe.description.toLowerCase().includes(normalizedQuery);
      const matchIng = item.recipe.ingredients.some((ing) =>
        ing.name.toLowerCase().includes(normalizedQuery)
      );
      if (!matchTitle && !matchDesc && !matchIng) {
        return false;
      }
    }

    // 2. Filter type
    switch (filterType) {
      case 'ready':
        return item.isReady; // 100%
      case 'missing-1-2':
        return item.missingCount >= 1 && item.missingCount <= 2;
      case 'missing-3-plus':
        return item.missingCount >= 3;
      case 'all':
      default:
        return true;
    }
  });
}

/**
 * Returns human-readable Uzbek status string
 */
export function getRecipeStatusText(missingCount: number): string {
  if (missingCount === 0) {
    return 'Tayyorlash mumkin';
  }
  return `${missingCount} ta masalliq yetishmaydi`;
}
