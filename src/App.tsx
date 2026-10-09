import React from 'react';
import { PantryProvider, usePantry } from './context/PantryContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { RecipesPage } from './components/RecipesPage';
import { IngredientsPage } from './components/IngredientsPage';
import { ShoppingListPage } from './components/ShoppingListPage';
import { MealPlannerPage } from './components/MealPlannerPage';
import { RecipeModal } from './components/RecipeModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = usePantry();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-12">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'recipes' && <RecipesPage />}
        {activeTab === 'ingredients' && <IngredientsPage />}
        {activeTab === 'shopping' && <ShoppingListPage />}
        {activeTab === 'planner' && <MealPlannerPage />}
      </main>

      <Footer />
      <RecipeModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <PantryProvider>
      <AppContent />
    </PantryProvider>
  );
}

export default App;
