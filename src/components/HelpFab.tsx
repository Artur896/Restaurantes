"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ConciergeBell, Droplets, Utensils, Receipt, Armchair, HelpCircle, Check } from "lucide-react";
import { BottomSheet } from "./ui/BottomSheet";
import { useApp } from "@/lib/store";

const opciones = [
  { tipo: "Llamar al mesero" as const, icon: ConciergeBell },
  { tipo: "Más agua" as const, icon: Droplets },
  { tipo: "Cubiertos" as const, icon: Utensils },
  { tipo: "Cuenta" as const, icon: Receipt },
  { tipo: "Cambiar mesa" as const, icon: Armchair },
  { tipo: "Otra cosa" as const, icon: HelpCircle },
];

export function HelpFab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const { solicitarAyuda, mesaInfo } = useApp();

  if (pathname.startsWith("/admin")) return null;

  function elegir(tipo: (typeof opciones)[number]["tipo"]) {
    solicitarAyuda(tipo);
    setConfirmado(true);
  }

  function cerrar() {
    setOpen(false);
    setTimeout(() => setConfirmado(false), 300);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-24 right-4 z-20 flex items-center gap-2 rounded-full bg-graphite px-4 py-3 text-sm font-semibold text-ivory shadow-silkLg md:bottom-8 md:right-8"
      >
        <ConciergeBell size={18} />
        <span className="hidden sm:inline">Necesito ayuda</span>
      </motion.button>

      <BottomSheet open={open} onClose={cerrar} title={confirmado ? undefined : "¿Qué necesitas?"} tone="light">
        <AnimatePresence mode="wait">
          {!confirmado ? (
            <motion.div
              key="opciones"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              {opciones.map(({ tipo, icon: Icon }) => (
                <button
                  key={tipo}
                  onClick={() => elegir(tipo)}
                  className="flex flex-col items-center gap-2.5 rounded-2xl border border-stone-line bg-white px-3 py-5 text-center shadow-silk transition hover:border-champagne/50 active:scale-95"
                >
                  <Icon size={24} className="text-champagne" />
                  <span className="text-sm font-medium text-graphite">{tipo}</span>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="confirmacion"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-6 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne/15">
                <Check size={30} className="text-champagne" />
              </span>
              <div>
                <p className="font-serif text-xl text-graphite">¡Solicitud enviada!</p>
                <p className="mt-1 text-sm text-graphite/55">
                  Un miembro de nuestro equipo atenderá tu solicitud
                  {mesaInfo ? ` en la Mesa ${mesaInfo.numero}` : ""} en breve.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </BottomSheet>
    </>
  );
}
