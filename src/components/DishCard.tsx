"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Heart, Flame, Leaf, WheatOff, Sprout } from "lucide-react";
import type { Platillo } from "@/lib/types";
import { Badge } from "./ui/Badge";
import { formatCurrency } from "@/lib/demo-data";
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
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl3 card-premium shadow-premium"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={platillo.imagen}
            alt={platillo.nombre}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {!platillo.disponible && (
            <div className="absolute inset-0 flex items-center justify-center bg-carbon/70 backdrop-blur-[1px]">
              <Badge tone="danger">Agotado temporalmente</Badge>
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorito(platillo.id);
            }}
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-carbon/60 backdrop-blur-sm transition hover:bg-carbon/80"
            aria-label="Favorito"
          >
            <Heart size={15} className={favorito ? "fill-wine text-wine" : "text-cream/80"} />
          </button>
          {platillo.etiquetas.length > 0 && (
            <div className="absolute bottom-2 left-2 flex gap-1.5">
              {platillo.etiquetas.slice(0, 2).map((e) => {
                const Icon = etiquetaIcon[e];
                return (
                  <span
                    key={e}
                    className="flex items-center gap-1 rounded-full bg-carbon/70 px-2 py-0.5 text-[10px] font-medium text-cream/90 backdrop-blur-sm"
                  >
                    {Icon && <Icon size={10} />}
                    {e}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base leading-snug text-cream">{platillo.nombre}</h3>
            <span className="whitespace-nowrap font-serif text-base text-gold">
              {formatCurrency(platillo.precio)}
            </span>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-cream/55">{platillo.descripcion}</p>
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className="text-xs font-medium text-cream/50 underline-offset-2 hover:text-gold hover:underline"
            >
              Ver detalles
            </button>
            <motion.button
              onClick={handleAdd}
              disabled={!platillo.disponible}
              whileTap={{ scale: 0.9 }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-carbon shadow-glow disabled:opacity-30"
              aria-label="Agregar"
            >
              <motion.span animate={justAdded ? { rotate: 360, scale: [1, 1.3, 1] } : {}}>
                <Plus size={16} strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      <DishDetailSheet platillo={platillo} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
