import React from 'react';
import { usePantry } from '../context/PantryContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePantry();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
        let borderClass = 'border-emerald-300';
        let bgClass = 'bg-white';

        if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
          borderClass = 'border-amber-300';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500" />;
          borderClass = 'border-blue-300';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-soft-lg border ${borderClass} ${bgClass} flex items-start gap-3 transition-all animate-fade-in`}
          >
            <div className="flex-shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h5 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 p-0.5 rounded transition-colors flex-shrink-0"
              aria-label="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
