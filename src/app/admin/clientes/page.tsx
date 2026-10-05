"use client";

import { useState } from "react";
import { X, Phone, Mail, Heart, CalendarCheck } from "lucide-react";
import { CLIENTES, PLATILLOS, RESERVACIONES } from "@/lib/demo-data";
import type { Cliente } from "@/lib/types";

export default function AdminClientesPage() {
  const [seleccion, setSeleccion] = useState<Cliente | null>(null);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-serif text-2xl text-white">Clientes</h1>
        <p className="text-sm text-white/40">{CLIENTES.length} clientes registrados.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#12141B]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-white/30">
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Teléfono</th>
              <th className="px-5 py-3 font-medium">Visitas</th>
              <th className="px-5 py-3 font-medium">Favoritos</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {CLIENTES.map((c) => (
              <tr key={c.id}>
                <td className="px-5 py-3.5 font-medium text-white">{c.nombre}</td>
                <td className="px-5 py-3.5 text-white/60">{c.telefono}</td>
                <td className="px-5 py-3.5 text-white/60">{c.visitas}</td>
                <td className="px-5 py-3.5 text-white/60">{c.favoritos.length}</td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    onClick={() => setSeleccion(c)}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/5"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {seleccion && (
        <>
          <div className="fixed inset-0 z-40 bg-black/70" onClick={() => setSeleccion(null)} />
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto border-l border-white/10 bg-[#12141B] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl text-white">{seleccion.nombre}</h2>
              <button onClick={() => setSeleccion(null)} className="text-white/40 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-gold" /> {seleccion.telefono}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-gold" /> {seleccion.correo}
              </p>
            </div>
            <p className="mb-2 mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
              <CalendarCheck size={13} /> Reservaciones
            </p>
            <div className="space-y-1.5 text-sm text-white/60">
              {RESERVACIONES.filter((r) => seleccion.reservaciones.includes(r.id)).map((r) => (
                <p key={r.id}>
                  {r.fecha} · {r.hora} · {r.estado}
                </p>
              ))}
            </div>
            <p className="mb-2 mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
              <Heart size={13} /> Favoritos
            </p>
            <div className="space-y-1.5 text-sm text-white/60">
              {PLATILLOS.filter((p) => seleccion.favoritos.includes(p.id)).map((p) => (
                <p key={p.id}>{p.nombre}</p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
