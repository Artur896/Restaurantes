"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScanLine } from "lucide-react";
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
  const router = useRouter();
  const [categoria, setCategoria] = useState<CategoriaMenu | "Todos">("Todos");
  const [activos, setActivos] = useState<Etiqueta[]>([]);
  const { esFavorito, mesaId, hydrated } = useApp();

  // La carta completa solo está disponible dentro del restaurante (mesa activada por QR).
  // El público general solo puede reservar y ver eventos.
  useEffect(() => {
    if (hydrated && !mesaId) router.replace("/mesa");
  }, [hydrated, mesaId, router]);

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

  if (!hydrated || !mesaId) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pb-20 pt-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-champagne/12 text-champagne">
          <ScanLine size={24} />
        </span>
        <p className="mt-4 font-serif text-xl text-graphite">La carta completa es exclusiva para mesa</p>
        <p className="mt-2 text-sm text-graphite/50">
          Escanea el código QR de tu mesa en el restaurante para ver y pedir del menú. Te llevamos ahí...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 border-b border-stone-line pb-7 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne">La Carta</p>
        <h1 className="mt-2 font-serif text-4xl text-graphite sm:text-5xl">Bistró Mecha</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-graphite/45">
          Cocina internacional, italiana y pizzería, cafetería, bar y coctelería — compuesta para acompañar cada
          momento de tu visita.
        </p>
      </motion.div>

      <div className="no-scrollbar -mx-5 mb-3 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0 sm:justify-center">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => toggleFiltro(f)}
            className={clsx(
              "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
              activos.includes(f)
                ? "border-graphite bg-graphite text-ivory"
                : "border-stone-line bg-white text-graphite/55 hover:border-champagne/60"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="no-scrollbar -mx-5 mb-10 flex justify-start gap-6 overflow-x-auto border-b border-stone-line px-5 pb-3 sm:mx-0 sm:justify-center sm:px-0">
        <button
          onClick={() => setCategoria("Todos")}
          className={clsx(
            "relative whitespace-nowrap px-1 pb-1 font-serif text-sm tracking-wide transition",
            categoria === "Todos" ? "text-graphite" : "text-graphite/35 hover:text-graphite/60"
          )}
        >
          Todos
          {categoria === "Todos" && (
            <motion.span layoutId="cat-underline" className="absolute -bottom-[13px] left-0 h-[1.5px] w-full bg-champagne" />
          )}
        </button>
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={clsx(
              "relative whitespace-nowrap px-1 pb-1 font-serif text-sm uppercase tracking-[0.08em] transition",
              categoria === c ? "text-graphite" : "text-graphite/35 hover:text-graphite/60"
            )}
          >
            {c}
            {categoria === c && (
              <motion.span layoutId="cat-underline" className="absolute -bottom-[13px] left-0 h-[1.5px] w-full bg-champagne" />
            )}
          </button>
        ))}
      </div>

      {platillos.length === 0 ? (
        <p className="py-16 text-center text-sm text-graphite/40">No encontramos platillos con esos filtros.</p>
      ) : (
        <motion.div
          key={categoria + activos.join(",")}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {platillos.map((p) => (
            <motion.div
              key={p.id}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <DishCard platillo={p} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
