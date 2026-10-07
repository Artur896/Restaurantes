"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Plus, Minus, LocateFixed, Users } from "lucide-react";
import type { Mesa, EstadoMesa } from "@/lib/types";
import { disponibilidadMesa } from "@/lib/demo-data";

type Bloque = { inicio: string; fin: string };

export type TableMapProps = {
  mesas: Mesa[];
  fecha: string;
  bloque: Bloque;
  personas: number;
  selectedMesaId: string | null;
  onSelectMesa: (mesa: Mesa, estado: EstadoMesa) => void;
};

const ESTADO_LABEL: Record<EstadoMesa, string> = {
  Disponible: "Disponible",
  Reservada: "Reservada",
  Ocupada: "Ocupada",
  "Por limpiar": "Reservada",
  Bloqueada: "No disponible",
};

function formaMesa(capacidad: number): "redonda" | "cuadrada" | "rectangular" {
  if (capacidad <= 2) return "redonda";
  if (capacidad <= 4) return "cuadrada";
  return "rectangular";
}

function estiloEstado(estado: EstadoMesa, seleccionada: boolean) {
  if (seleccionada) {
    return "border-graphite bg-graphite text-ivory shadow-champagneGlow ring-2 ring-champagne/70 ring-offset-2 ring-offset-ivory";
  }
  switch (estado) {
    case "Disponible":
      return "border-stone-line bg-white text-graphite hover:border-champagne hover:shadow-silk";
    case "Reservada":
    case "Por limpiar":
      return "border-stone-line/70 bg-stone-soft text-graphite/40 cursor-not-allowed";
    case "Ocupada":
      return "border-graphite/15 bg-graphite/10 text-graphite/35 cursor-not-allowed";
    case "Bloqueada":
      return "border-stone-line/50 bg-stone-soft/60 text-graphite/20 cursor-not-allowed opacity-60";
  }
}

export function TableMap({ mesas, fecha, bloque, personas, selectedMesaId, onSelectMesa }: TableMapProps) {
  const [scale, setScale] = useState(1);
  const dragRef = useRef<HTMLDivElement>(null);

  const conEstado = useMemo(
    () => mesas.map((m) => ({ mesa: m, estado: disponibilidadMesa(m, fecha, bloque) })),
    [mesas, fecha, bloque]
  );

  return (
    <div className="relative">
      {/* Leyenda */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-graphite/55">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-stone-line bg-white" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-graphite" /> Seleccionada
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-stone-soft ring-1 ring-stone-line" /> Reservada
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-graphite/20" /> Ocupada
        </span>
      </div>

      {/* Mapa interactivo */}
      <div className="relative overflow-hidden rounded-xl3 border border-stone-line bg-ivory-soft shadow-silk">
        <div className="relative h-[420px] w-full touch-none sm:h-[480px]" ref={dragRef}>
          <motion.div
            drag
            dragConstraints={{ left: -220, right: 220, top: -160, bottom: 160 }}
            dragElastic={0.08}
            style={{ scale }}
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute inset-0 origin-center cursor-grab active:cursor-grabbing"
          >
            {/* Elementos decorativos del plano */}
            <div className="absolute left-1/2 top-[4%] w-[46%] -translate-x-1/2 rounded-b-xl2 border border-b-0 border-champagne/30 bg-champagne/10 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
              Escenario
            </div>
            <div className="absolute left-[4%] top-[42%] rounded-lg border border-stone-line bg-white/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-graphite/40">
              Barra
            </div>
            <div className="absolute right-[4%] top-[4%] rounded-lg border border-stone-line bg-white/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-graphite/40">
              Recepción
            </div>

            {conEstado.map(({ mesa, estado }) => {
              const forma = formaMesa(mesa.capacidad);
              const seleccionada = selectedMesaId === mesa.id;
              const deshabilitada = estado !== "Disponible";
              const vistaEscenario = mesa.zona === "Cerca del escenario";
              return (
                <button
                  key={mesa.id}
                  disabled={deshabilitada}
                  onClick={() => onSelectMesa(mesa, estado)}
                  style={{ left: `${mesa.x}%`, top: `${mesa.y}%` }}
                  className={clsx(
                    "group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border text-[10px] font-semibold transition-all duration-200",
                    forma === "redonda" && "h-14 w-14 rounded-full",
                    forma === "cuadrada" && "h-16 w-16 rounded-2xl",
                    forma === "rectangular" && "h-14 w-24 rounded-2xl",
                    estiloEstado(estado, seleccionada)
                  )}
                >
                  <span className="text-[13px] font-serif leading-none">{mesa.numero}</span>
                  <span className="mt-0.5 flex items-center gap-0.5 text-[9px] font-normal opacity-70">
                    <Users size={9} /> {mesa.capacidad}
                  </span>
                  {vistaEscenario && estado === "Disponible" && (
                    <span className="absolute -top-1.5 -right-1.5 h-2 w-2 rounded-full bg-champagne" />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Controles de zoom / recentrar */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={() => setScale((s) => Math.min(2.2, +(s + 0.25).toFixed(2)))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-line bg-white/90 text-graphite shadow-silk backdrop-blur"
            aria-label="Acercar"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => setScale((s) => Math.max(0.7, +(s - 0.25).toFixed(2)))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-line bg-white/90 text-graphite shadow-silk backdrop-blur"
            aria-label="Alejar"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => setScale(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-line bg-white/90 text-graphite shadow-silk backdrop-blur"
            aria-label="Centrar mapa"
          >
            <LocateFixed size={15} />
          </button>
        </div>
      </div>

      {personas > 0 && (
        <p className="mt-2.5 text-[11px] text-graphite/45">
          Mostrando mesas para {personas} {personas === 1 ? "persona" : "personas"} · toca una mesa disponible para
          seleccionarla.
        </p>
      )}
    </div>
  );
}

export { ESTADO_LABEL, formaMesa };
