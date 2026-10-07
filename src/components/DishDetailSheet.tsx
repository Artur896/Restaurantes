"use client";

import Image from "next/image";
import { useState } from "react";
import type { Platillo } from "@/lib/types";
import { BottomSheet } from "./ui/BottomSheet";
import { Button } from "./ui/Button";
import { useApp } from "@/lib/store";
import { Minus, Plus } from "lucide-react";

export function DishDetailSheet({
  platillo,
  open,
  onClose,
}: {
  platillo: Platillo;
  open: boolean;
  onClose: () => void;
}) {
  const { agregarAlCarrito } = useApp();
  const [cantidad, setCantidad] = useState(1);

  function agregar() {
    for (let i = 0; i < cantidad; i++) agregarAlCarrito(platillo);
    setCantidad(1);
    onClose();
  }

  return (
    <BottomSheet open={open} onClose={onClose} tone="light">
      <div className="relative -mx-5 -mt-4 mb-4 aspect-[16/10] overflow-hidden sm:-mx-6 sm:rounded-t-3xl">
        <Image src={platillo.imagen} alt={platillo.nombre} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/40 via-transparent to-transparent" />
      </div>
      {platillo.etiquetas.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {platillo.etiquetas.map((e) => (
            <span
              key={e}
              className="rounded-full border border-champagne/30 bg-champagne/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-champagne"
            >
              {e}
            </span>
          ))}
        </div>
      )}
      <h3 className="mt-3 font-serif text-2xl text-graphite">{platillo.nombre}</h3>
      <p className="mt-2 text-sm leading-relaxed text-graphite/55">{platillo.descripcion}</p>
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-graphite/35">Ingredientes</p>
        <div className="flex flex-wrap gap-1.5">
          {platillo.ingredientes.map((ing) => (
            <span key={ing} className="rounded-full border border-stone-line bg-white px-3 py-1 text-xs text-graphite/60">
              {ing}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-stone-line pt-5">
        <span className="text-xs font-medium uppercase tracking-wider text-graphite/35">Cantidad</span>
        <div className="flex items-center gap-3 rounded-full border border-stone-line px-2 py-1">
          <button
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-graphite/60 hover:bg-graphite/5"
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm text-graphite">{cantidad}</span>
          <button
            onClick={() => setCantidad((c) => c + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-graphite/60 hover:bg-graphite/5"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <Button variant="noir" fullWidth size="lg" className="mt-4" onClick={agregar} disabled={!platillo.disponible}>
        {platillo.disponible ? "Agregar al pedido" : "Agotado temporalmente"}
      </Button>
    </BottomSheet>
  );
}
