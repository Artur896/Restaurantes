"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PLATILLOS } from "@/lib/demo-data";
import type { CategoriaMenu, Etiqueta } from "@/lib/types";
import { DishCard } from "@/components/DishCard";
import { useApp } from "@/lib/store";
import { clsx } from "clsx";

const categorias: CategoriaMenu[] = [
  "Desayunos",
  "Entradas",
  "Ensaladas",
  "Pastas",
  "Pizzas",
  "Platos fuertes",
  "Postres",
  "Café",
  "Cócteles",
  "Vinos",
  "Bebidas",
];

const filtros: Etiqueta[] = ["Vegetariano", "Vegano", "Sin gluten", "Favorito", "Más pedido"];

export default function MenuPage() {
  const [categoria, setCategoria] = useState<CategoriaMenu | "Todos">("Todos");
  const [activos, setActivos] = useState<Etiqueta[]>([]);
  const { esFavorito } = useApp();

  function toggleFiltro(f: Etiqueta) {
    setActivos((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  const platillos = useMemo(() => {
    return PLATILLOS.filter((p) => {
      if (categoria !== "Todos" && p.categoria !== categoria) return false;
      for (const f of activos) {
        if (f === "Favorito") {
          if (!esFavorito(p.id)) return false;
        } else if (!p.etiquetas.includes(f)) {
          return false;
        }
      }
      return true;
    });
  }, [categoria, activos, esFavorito]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Menú digital</p>
        <h1 className="mt-1 font-serif text-4xl text-cream">Nuestra carta</h1>
        <p className="mt-2 max-w-lg text-sm text-cream/55">
          Cocina internacional, italiana y pizzería, cafetería, bar y coctelería — todo en un mismo lugar.
        </p>
      </div>

      <div className="no-scrollbar -mx-5 mb-3 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => toggleFiltro(f)}
            className={clsx(
              "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
              activos.includes(f)
                ? "border-gold bg-gold/15 text-gold"
                : "border-cream/15 text-cream/60 hover:border-cream/30"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto border-b border-cream/10 px-5 pb-3 sm:mx-0 sm:px-0">
        <button
          onClick={() => setCategoria("Todos")}
          className={clsx(
            "relative whitespace-nowrap px-1 pb-1 text-sm font-medium transition",
            categoria === "Todos" ? "text-gold" : "text-cream/50 hover:text-cream"
          )}
        >
          Todos
          {categoria === "Todos" && (
            <motion.span layoutId="cat-underline" className="absolute -bottom-[13px] left-0 h-0.5 w-full bg-gold" />
          )}
        </button>
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={clsx(
              "relative whitespace-nowrap px-1 pb-1 text-sm font-medium transition",
              categoria === c ? "text-gold" : "text-cream/50 hover:text-cream"
            )}
          >
            {c}
            {categoria === c && (
              <motion.span layoutId="cat-underline" className="absolute -bottom-[13px] left-0 h-0.5 w-full bg-gold" />
            )}
          </button>
        ))}
      </div>

      {platillos.length === 0 ? (
        <p className="py-16 text-center text-sm text-cream/40">No encontramos platillos con esos filtros.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {platillos.map((p) => (
            <DishCard key={p.id} platillo={p} />
          ))}
        </div>
      )}
    </div>
  );
}
