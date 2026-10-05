"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Clock, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/demo-data";
import { Badge } from "@/components/ui/Badge";

type EstadoPedido = "Nuevo" | "En preparación" | "Listo" | "Entregado";

type Pedido = {
  id: string;
  mesa: number;
  items: { nombre: string; cantidad: number }[];
  hora: string;
  total: number;
  estado: EstadoPedido;
};

const estadoTone: Record<EstadoPedido, "gold" | "wine" | "forest" | "neutral"> = {
  Nuevo: "wine",
  "En preparación": "gold",
  Listo: "forest",
  Entregado: "neutral",
};

const flujo: Record<EstadoPedido, EstadoPedido> = {
  Nuevo: "En preparación",
  "En preparación": "Listo",
  Listo: "Entregado",
  Entregado: "Entregado",
};

const pedidosDemo: Pedido[] = [
  { id: "ord1", mesa: 2, items: [{ nombre: "Pizza Margarita", cantidad: 1 }, { nombre: "Negroni Mecha", cantidad: 2 }], hora: "20:05", total: 510, estado: "En preparación" },
  { id: "ord2", mesa: 6, items: [{ nombre: "Carpaccio de Res", cantidad: 1 }, { nombre: "Copa de Vino Tinto", cantidad: 2 }], hora: "19:20", total: 475, estado: "Listo" },
  { id: "ord3", mesa: 12, items: [{ nombre: "Hamburguesa Mecha", cantidad: 2 }, { nombre: "Limonada de Romero", cantidad: 2 }], hora: "20:12", total: 630, estado: "Nuevo" },
  { id: "ord4", mesa: 14, items: [{ nombre: "Pasta Alfredo", cantidad: 1 }, { nombre: "Tiramisú", cantidad: 1 }, { nombre: "Espresso Martini", cantidad: 1 }], hora: "20:00", total: 510, estado: "Entregado" },
];

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState(pedidosDemo);

  function avanzar(id: string) {
    setPedidos((ps) => ps.map((p) => (p.id === id ? { ...p, estado: flujo[p.estado] } : p)));
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-serif text-2xl text-white">Pedidos activos</h1>
        <p className="text-sm text-white/40">{pedidos.filter((p) => p.estado !== "Entregado").length} pedidos en curso.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pedidos.map((p) => (
          <div key={p.id} className="rounded-2xl border border-white/5 bg-[#12141B] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <MapPin size={14} className="text-gold" /> Mesa {p.mesa}
              </span>
              <Badge tone={estadoTone[p.estado]}>{p.estado}</Badge>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-white/60">
              {p.items.map((it) => (
                <li key={it.nombre}>
                  {it.cantidad}× {it.nombre}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-sm">
              <span className="flex items-center gap-1.5 text-white/40">
                <Clock size={13} /> {p.hora}
              </span>
              <span className="font-semibold text-gold">{formatCurrency(p.total)}</span>
            </div>
            <button
              onClick={() => avanzar(p.id)}
              disabled={p.estado === "Entregado"}
              className={clsx(
                "mt-3 w-full rounded-lg py-2 text-xs font-semibold transition",
                p.estado === "Entregado" ? "bg-white/5 text-white/30" : "bg-gold text-carbon hover:bg-gold-soft"
              )}
            >
              {p.estado === "Entregado" ? "Completado" : `Marcar como ${flujo[p.estado]}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
