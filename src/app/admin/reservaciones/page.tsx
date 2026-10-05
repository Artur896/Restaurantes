"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { Clock, Users, MapPin } from "lucide-react";
import { RESERVACIONES, HORARIOS_RESERVA } from "@/lib/demo-data";
import type { EstadoReservacion, Reservacion } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

type Vista = "Día" | "Semana" | "Mes";

const estadoTone: Record<EstadoReservacion, "gold" | "forest" | "neutral" | "wine" | "danger"> = {
  Confirmada: "gold",
  Pendiente: "neutral",
  "En mesa": "forest",
  Finalizada: "neutral",
  Cancelada: "danger",
};

const estados: EstadoReservacion[] = ["Confirmada", "Pendiente", "En mesa", "Finalizada", "Cancelada"];

export default function AdminReservacionesPage() {
  const [vista, setVista] = useState<Vista>("Día");
  const [reservas, setReservas] = useState<Reservacion[]>(RESERVACIONES);
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));

  const reservasDia = useMemo(() => reservas.filter((r) => r.fecha === fecha), [reservas, fecha]);

  function cambiarHora(id: string, hora: string) {
    setReservas((rs) => rs.map((r) => (r.id === id ? { ...r, hora } : r)));
  }
  function cambiarEstado(id: string, estado: EstadoReservacion) {
    setReservas((rs) => rs.map((r) => (r.id === id ? { ...r, estado } : r)));
  }

  const semana = useMemo(() => {
    const base = new Date(fecha + "T00:00:00");
    const start = new Date(base);
    start.setDate(base.getDate() - base.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toISOString().slice(0, 10);
    });
  }, [fecha]);

  const mes = useMemo(() => {
    const base = new Date(fecha + "T00:00:00");
    const first = new Date(base.getFullYear(), base.getMonth(), 1);
    const totalDias = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    const offset = first.getDay();
    const dias: (string | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= totalDias; d++) {
      dias.push(new Date(base.getFullYear(), base.getMonth(), d).toISOString().slice(0, 10));
    }
    return dias;
  }, [fecha]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-white">Reservaciones</h1>
          <p className="text-sm text-white/40">Administra reservas, horarios y estados en tiempo real.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#12141B] px-3 py-2 text-sm text-white"
          />
          <div className="flex rounded-lg border border-white/10 bg-[#12141B] p-1">
            {(["Día", "Semana", "Mes"] as Vista[]).map((v) => (
              <button
                key={v}
                onClick={() => setVista(v)}
                className={clsx(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition",
                  vista === v ? "bg-gold text-carbon" : "text-white/50 hover:text-white"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {vista === "Día" && (
        <div className="space-y-3">
          {reservasDia.length === 0 && (
            <p className="rounded-xl border border-white/5 bg-[#12141B] p-8 text-center text-sm text-white/40">
              No hay reservaciones para esta fecha.
            </p>
          )}
          {reservasDia.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/5 bg-[#12141B] p-4">
              <div className="min-w-[160px]">
                <p className="font-medium text-white">{r.nombre}</p>
                <p className="text-xs text-white/40">{r.telefono}</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/60">
                <Clock size={14} />
                <select
                  value={r.hora}
                  onChange={(e) => cambiarHora(r.id, e.target.value)}
                  className="rounded-md border border-white/10 bg-[#0B0D12] px-2 py-1 text-sm text-white"
                >
                  {HORARIOS_RESERVA.map((h) => (
                    <option key={h.hora} value={h.hora}>
                      {h.hora}
                    </option>
                  ))}
                </select>
              </div>
              <span className="flex items-center gap-1.5 text-sm text-white/60">
                <Users size={14} /> {r.personas}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-white/60">
                <MapPin size={14} /> {r.zona}
              </span>
              <span className="text-sm text-white/50">{r.ocasion}</span>
              <select
                value={r.estado}
                onChange={(e) => cambiarEstado(r.id, e.target.value as EstadoReservacion)}
                className="ml-auto rounded-full border border-white/10 bg-[#0B0D12] px-3 py-1.5 text-xs font-medium text-white"
              >
                {estados.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              <Badge tone={estadoTone[r.estado]}>{r.estado}</Badge>
            </div>
          ))}
        </div>
      )}

      {vista === "Semana" && (
        <div className="grid grid-cols-7 gap-2">
          {semana.map((d) => (
            <div key={d} className="min-h-[140px] rounded-xl border border-white/5 bg-[#12141B] p-2.5">
              <p className="mb-2 text-xs font-medium text-white/50">{new Date(d + "T00:00:00").toLocaleDateString("es-MX", { weekday: "short", day: "numeric" })}</p>
              <div className="space-y-1.5">
                {reservas
                  .filter((r) => r.fecha === d)
                  .map((r) => (
                    <div key={r.id} className="truncate rounded-md bg-gold/10 px-2 py-1 text-[11px] text-gold">
                      {r.hora} {r.nombre}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {vista === "Mes" && (
        <div className="grid grid-cols-7 gap-2">
          {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
            <div key={i} className="text-center text-xs text-white/30">
              {d}
            </div>
          ))}
          {mes.map((d, i) => {
            const count = d ? reservas.filter((r) => r.fecha === d).length : 0;
            return (
              <button
                key={i}
                disabled={!d}
                onClick={() => d && setFecha(d)}
                className={clsx(
                  "flex h-16 flex-col items-center justify-center rounded-lg border text-sm",
                  !d && "border-transparent",
                  d && fecha === d ? "border-gold bg-gold/10 text-gold" : "border-white/5 bg-[#12141B] text-white/60"
                )}
              >
                {d && new Date(d + "T00:00:00").getDate()}
                {count > 0 && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
