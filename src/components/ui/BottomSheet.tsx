"use client";

import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { X } from "lucide-react";
import React from "react";

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  tone = "dark",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** "light" = Premium White customer-facing style, "dark" = legacy/admin style. */
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={clsx("fixed inset-0 z-40 backdrop-blur-sm", light ? "bg-graphite/25" : "bg-black/60")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={clsx(
              "fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl px-5 pb-8 pt-4 safe-bottom sm:mx-auto sm:max-w-lg sm:rounded-3xl sm:bottom-6",
              light
                ? "border border-stone-line bg-ivory shadow-silkLg"
                : "border-t border-cream/10 bg-carbon-soft shadow-premium"
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className={clsx("mx-auto mb-4 h-1.5 w-12 rounded-full sm:hidden", light ? "bg-graphite/15" : "bg-cream/15")} />
            <div className="mb-4 flex items-center justify-between">
              {title && (
                <h3 className={clsx("font-serif text-xl", light ? "text-graphite" : "text-cream")}>{title}</h3>
              )}
              <button
                onClick={onClose}
                className={clsx(
                  "ml-auto rounded-full p-2 transition",
                  light
                    ? "text-graphite/50 hover:bg-graphite/5 hover:text-graphite"
                    : "text-cream/60 hover:bg-cream/10 hover:text-cream"
                )}
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
