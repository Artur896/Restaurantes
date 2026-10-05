"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  Bell,
  CalendarCheck,
  ConciergeBell,
  Receipt,
  ClipboardList,
  Music2,
  LayoutGrid,
} from "lucide-react";
import { NOTIFICACIONES } from "@/lib/demo-data";
import type { TipoNotificacion } from "@/lib/types";

const iconos: Record<TipoNotificacion, React.ElementType> = {
  "Nueva reservación": CalendarCheck,
  "Nueva solicitud de mesero": ConciergeBell,
  "Nueva cuenta solicitada": Receipt,
  "Nuevo pedido": ClipboardList,
  "Evento próximo": Music2,
  "Mesa ocupada": LayoutGrid,
};

export default function AdminNotificacionesPage() {
  const [notis, setNotis] = useState(NOTIFICACIONES);

  function marcarLeida(id: string) {
    setNotis((ns) => ns.map((n) => (n.id === id ? { ...n, leida: true } : n)));
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-white">Notificaciones</h1>
          <p className="text-sm text-white/40">{notis.filter((n) => !n.leida).length} sin leer.</p>
        </div>
        <button
          onClick={() => setNotis((ns) => ns.map((n) => ({ ...n, leida: true })))}
          className="text-xs font-medium text-gold hover:underline"
        >
          Marcar todas como leídas
        </button>
      </div>

      <div className="space-y-2">
        {notis.map((n) => {
          const Icon = iconos[n.tipo] ?? Bell;
          return (
            <button
              key={n.id}
              onClick={() => marcarLeida(n.id)}
              className={clsx(
                "flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition",
                n.leida ? "border-white/5 bg-[#12141B]" : "border-gold/30 bg-gold/5"
              )}
            >
              <span className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", n.leida ? "bg-white/5 text-white/40" : "bg-gold/20 text-gold")}>
                <Icon size={16} />
              </span>
              <div>
                <p className={clsx("text-sm font-semibold", n.leida ? "text-white/60" : "text-white")}>{n.titulo}</p>
                <p className="text-xs text-white/40">{n.mensaje}</p>
                <p className="mt-1 text-[11px] text-white/30">{n.hora}</p>
              </div>
              {!n.leida && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-gold" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
