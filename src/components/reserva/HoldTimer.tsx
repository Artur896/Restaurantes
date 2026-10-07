"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

export function HoldTimer({
  expiresAt,
  onExpire,
  label = "Tu mesa está apartada",
}: {
  expiresAt: number;
  onExpire?: () => void;
  label?: string;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, expiresAt - now);
  const expired = remainingMs <= 0;

  useEffect(() => {
    if (expired) onExpire?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expired]);

  const totalSeconds = Math.ceil(remainingMs / 1000);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  const urgente = totalSeconds <= 30;

  return (
    <AnimatePresence mode="wait">
      {expired ? (
        <motion.div
          key="expired"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-2xl border border-stone-line bg-white px-4 py-3 text-graphite/60 shadow-silk"
        >
          <Clock size={16} />
          <p className="text-sm">El tiempo de selección terminó. La mesa vuelve a estar disponible.</p>
        </motion.div>
      ) : (
        <motion.div
          key="active"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={
            "flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 shadow-silk transition-colors " +
            (urgente ? "border-champagne/60 bg-champagne/10" : "border-stone-line bg-white")
          }
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-graphite/50">{label}</p>
            <p className="text-[11px] text-graphite/40">Completa tu reservación antes de que termine el tiempo.</p>
          </div>
          <motion.span
            key={totalSeconds}
            initial={{ scale: 1 }}
            animate={{ scale: [1.08, 1] }}
            transition={{ duration: 0.3 }}
            className={
              "font-serif text-2xl tabular-nums tracking-wider " + (urgente ? "text-champagne" : "text-graphite")
            }
          >
            {mm}:{ss}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
