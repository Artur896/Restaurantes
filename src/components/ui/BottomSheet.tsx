"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-cream/10 bg-carbon-soft px-5 pb-8 pt-4 shadow-premium safe-bottom sm:mx-auto sm:max-w-lg sm:rounded-3xl sm:bottom-6"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-cream/15 sm:hidden" />
            <div className="mb-4 flex items-center justify-between">
              {title && <h3 className="font-serif text-xl text-cream">{title}</h3>}
              <button
                onClick={onClose}
                className="ml-auto rounded-full p-2 text-cream/60 transition hover:bg-cream/10 hover:text-cream"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
