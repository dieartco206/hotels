import React, { useEffect } from 'react';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-slate-900 text-white rounded-2xl shadow-float px-4 py-3.5 flex items-center gap-3 border border-slate-700/80 max-w-md">
        {toast.type === 'wishlist' && (
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </div>
        )}
        {toast.type === 'success' && (
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        )}
        {toast.type === 'info' && (
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-blue-400" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white">{toast.title}</p>
          <p className="text-xs text-slate-300 truncate">{toast.message}</p>
        </div>

        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
