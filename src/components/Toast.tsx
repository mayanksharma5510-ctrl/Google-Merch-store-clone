import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast: React.FC = () => {
  const { activeToast, showToast } = useShop();

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        // Auto dismiss by nullifying
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm pointer-events-none">
      <AnimatePresence>
        {activeToast && (
          <motion.div
            key={activeToast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl bg-gray-900 text-white shadow-xl border border-gray-800"
          >
            <div className="flex items-center gap-3">
              {activeToast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              {activeToast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              {activeToast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
              <span className="text-sm font-medium leading-snug">{activeToast.message}</span>
            </div>
            <button
              onClick={() => showToast('', 'info')}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg"
              aria-label="Close Toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
