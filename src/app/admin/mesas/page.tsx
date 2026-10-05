"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { X, Users, Clock, DollarSign } from "lucide-react";
import { MESAS, formatCurrency } from "@/lib/demo-data";
import type { EstadoMesa, Mesa } from "@/lib/types";

const estadoColor: Record<EstadoMesa, string> = {
  Disponible: "bg-emerald-500 border-emerald-300",
  Reservada: "bg-amber-500 border-amber-300",
  Ocupada: "bg-wine border-rose-300",
  "Por limpiar": "bg-sky-500 border-sky-300",
  Bloqueada: "bg-white/20 border-white/30",
};

const estados: EstadoMesa[] = ["Disponible", "Reservada", "Ocupada", "Por limpiar", "Bloqueada"];

export default function AdminMesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>(MESAS);
  const [seleccion, setSeleccion] = useState<Mesa | null>(null);

  function actualizarEstado(estado: EstadoMesa) {
    if (!seleccion) return;
    setMesas((ms) => ms.map((m) => (m.id === seleccion.id ? { ...m, estado } : m)));
    setSeleccion((s) => (s ? { ...s, estado } : s));
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-white/5 bg-[#12141B] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-2xl text-white">Mapa de mesas</h1>
          <div className="flex flex-wrap gap-3 text-xs text-white/50">
            {estados.map((e) => (
              <span key={e} className="flex items-center gap-1.5">
                <span className={clsx("h-2.5 w-2.5 rounded-full", estadoColor[e].split(" ")[0])} />
                {e}
              </span>
            ))}
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-[#0B0D12]">
          <div className="absolute inset-0 bg-grain opacity-20" />
          {mesas.map((m) => (
            <button
              key={m.id}
              onClick={() => setSeleccion(m)}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              className={clsx(
                "absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border-2 text-sm font-semibold text-white shadow-lg transition hover:scale-110",
                estadoColor[m.estado],
                seleccion?.id === m.id && "ring-2 ring-white"
              )}
            >
              {m.numero}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#12141B] p-5">
        {!seleccion ? (
          <p className="pt-10 text-center text-sm text-white/40">Selecciona una mesa en el mapa para ver sus detalles.</p>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl text-white">Mesa {seleccion.numero}</h2>
              <button onClick={() => setSeleccion(null)} className="text-white/40 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <Users size={15} /> {seleccion.capacidad} personas · {seleccion.zona}
              </div>
              {seleccion.clienteActual && (
                <div className="text-white/60">
                  Cliente: <span className="text-white">{seleccion.clienteActual}</span>
                </div>
              )}
              {seleccion.horaOcupacion && (
                <div className="flex items-center gap-2 text-white/60">
                  <Clock size={15} /> Desde las {seleccion.horaOcupacion}
                </div>
              )}
              {seleccion.cuentaTotal !== undefined && (
                <div className="flex items-center gap-2 text-white/60">
                  <DollarSign size={15} /> Cuenta: {formatCurrency(seleccion.cuentaTotal)}
                </div>
              )}
            </div>
            <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-white/40">Cambiar estado</p>
            <div className="grid grid-cols-1 gap-2">
              {estados.map((e) => (
                <button
                  key={e}
                  onClick={() => actualizarEstado(e)}
                  className={clsx(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                    seleccion.estado === e
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/10 text-white/60 hover:border-white/25"
                  )}
                >
                  <span className={clsx("h-2.5 w-2.5 rounded-full", estadoColor[e].split(" ")[0])} />
                  {e}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
