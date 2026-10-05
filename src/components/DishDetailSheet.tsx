"use client";

import Image from "next/image";
import { useState } from "react";
import type { Platillo } from "@/lib/types";
import { BottomSheet } from "./ui/BottomSheet";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { formatCurrency } from "@/lib/demo-data";
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
    <BottomSheet open={open} onClose={onClose}>
      <div className="relative -mx-5 -mt-4 mb-4 aspect-[16/10] overflow-hidden sm:-mx-6 sm:rounded-t-3xl">
        <Image src={platillo.imagen} alt={platillo.nombre} fill className="object-cover" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {platillo.etiquetas.map((e) => (
          <Badge key={e} tone="gold">
            {e}
          </Badge>
        ))}
      </div>
      <h3 className="mt-3 font-serif text-2xl text-cream">{platillo.nombre}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cream/60">{platillo.descripcion}</p>
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cream/40">Ingredientes</p>
        <div className="flex flex-wrap gap-1.5">
          {platillo.ingredientes.map((ing) => (
            <span key={ing} className="rounded-full bg-cream/5 px-3 py-1 text-xs text-cream/70">
              {ing}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-cream/10 pt-5">
        <span className="font-serif text-2xl text-gold">{formatCurrency(platillo.precio * cantidad)}</span>
        <div className="flex items-center gap-3 rounded-full border border-cream/15 px-2 py-1">
          <button
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-cream/70 hover:bg-cream/10"
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm">{cantidad}</span>
          <button
            onClick={() => setCantidad((c) => c + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-cream/70 hover:bg-cream/10"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <Button fullWidth size="lg" className="mt-4" onClick={agregar} disabled={!platillo.disponible}>
        {platillo.disponible ? "Agregar al pedido" : "Agotado temporalmente"}
      </Button>
    </BottomSheet>
  );
}
