"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Heart, Flame, Leaf, WheatOff, Sprout } from "lucide-react";
import type { Platillo } from "@/lib/types";
import { useApp } from "@/lib/store";
import { DishDetailSheet } from "./DishDetailSheet";

const etiquetaIcon: Record<string, React.ElementType> = {
  Vegetariano: Leaf,
  Vegano: Sprout,
  "Sin gluten": WheatOff,
  "Más pedido": Flame,
};

export function DishCard({ platillo }: { platillo: Platillo }) {
  const { agregarAlCarrito, toggleFavorito, esFavorito } = useApp();
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const favorito = esFavorito(platillo.id);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    agregarAlCarrito(platillo);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen(true)}
        className="group relative flex cursor-pointer flex-col overflow-visible rounded-xl3 border border-stone-line bg-white shadow-silk transition-shadow duration-300 hover:shadow-silkLg"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl3">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={platillo.imagen}
              alt={platillo.nombre}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>
          {!platillo.disponible && (
            <div className="absolute inset-0 flex items-center justify-center bg-ivory/80 backdrop-blur-[1px]">
              <span className="rounded-full border border-stone-line bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-graphite/60">
                Agotado temporalmente
              </span>
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorito(platillo.id);
            }}
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-silk backdrop-blur-sm transition hover:bg-white"
            aria-label="Favorito"
          >
            <Heart size={14} className={favorito ? "fill-champagne text-champagne" : "text-graphite/50"} />
          </button>
          {platillo.etiquetas.length > 0 && (
            <div className="absolute bottom-2.5 left-2.5 flex gap-1.5">
              {platillo.etiquetas.slice(0, 2).map((e) => {
                const Icon = etiquetaIcon[e];
                return (
                  <span
                    key={e}
                    className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-graphite/70 shadow-silk backdrop-blur-sm"
                  >
                    {Icon && <Icon size={10} />}
                    {e}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-4">
          <h3 className="font-serif text-base leading-snug text-graphite">{platillo.nombre}</h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-graphite/45">{platillo.descripcion}</p>
          <div className="mt-2.5 flex items-center justify-end border-t border-stone-line pt-2.5">
            <motion.button
              onClick={handleAdd}
              disabled={!platillo.disponible}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-line text-graphite/60 transition hover:border-champagne hover:text-champagne disabled:opacity-30"
              aria-label="Agregar"
            >
              <motion.span animate={justAdded ? { rotate: 360, scale: [1, 1.3, 1] } : {}}>
                <Plus size={14} strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      <DishDetailSheet platillo={platillo} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
