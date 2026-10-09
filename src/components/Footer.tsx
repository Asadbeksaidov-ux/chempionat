import { ChefHat, Heart } from 'lucide-react';
import { usePantry } from '../context/PantryContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = usePantry();

  return (
    <footer className="border-t border-cream-200 bg-white py-10 mt-12 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-forest-800 text-white flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-cream-100" />
          </div>
          <div>
            <div className="font-extrabold text-stone-900 text-sm">
              Smart Pantry
            </div>
            <div className="text-stone-500 text-[11px]">
              "Uyda bor masalliqlardan mazali taomlar toping."
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-stone-600 font-semibold">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-forest-800 transition-colors"
          >
            Bosh sahifa
          </button>
          <button
            onClick={() => {
              setActiveTab('recipes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-forest-800 transition-colors"
          >
            Retseptlar
          </button>
          <button
            onClick={() => {
              setActiveTab('ingredients');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-forest-800 transition-colors"
          >
            Mening masalliqlarim
          </button>
          <button
            onClick={() => {
              setActiveTab('shopping');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-forest-800 transition-colors"
          >
            Xarid ro‘yxati
          </button>
          <button
            onClick={() => {
              setActiveTab('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-forest-800 transition-colors"
          >
            Haftalik reja
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
          <span>© 2026 Smart Pantry MVP</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-stone-500">
            Oila uchun mehr bilan <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </span>
        </div>
      </div>
    </footer>
  );
};
