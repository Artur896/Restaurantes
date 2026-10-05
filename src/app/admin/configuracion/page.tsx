"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer, RefreshCw, Store, ShieldCheck } from "lucide-react";
import { SUCURSALES, MESAS } from "@/lib/demo-data";
import type { Rol } from "@/lib/types";

const roles: { rol: Rol; acceso: string }[] = [
  { rol: "Administrador", acceso: "Acceso total: dashboard, configuración, usuarios, todas las sucursales." },
  { rol: "Gerente", acceso: "Reservaciones, mesas, menú, eventos, reportes de su sucursal." },
  { rol: "Mesero", acceso: "Mapa de mesas, pedidos, cuentas y solicitudes de su turno." },
  { rol: "Cocina", acceso: "Vista de pedidos activos y estado de preparación." },
  { rol: "Cliente", acceso: "Sin acceso al panel administrativo — solo experiencia de mesa y reservaciones." },
];

export default function AdminConfiguracionPage() {
  const [tokens, setTokens] = useState<Record<string, string>>(
    Object.fromEntries(MESAS.map((m) => [m.id, `${m.id}-${Math.random().toString(36).slice(2, 8)}`]))
  );

  function regenerar(id: string) {
    setTokens((t) => ({ ...t, [id]: `${id}-${Math.random().toString(36).slice(2, 8)}` }));
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-1 font-serif text-2xl text-white">Configuración</h1>
        <p className="mb-4 text-sm text-white/40">Sucursales, roles de acceso y códigos QR por mesa.</p>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Store size={15} className="text-gold" /> Sucursales
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SUCURSALES.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/5 bg-[#12141B] p-4">
              <p className="font-serif text-lg text-white">{s.nombre}</p>
              <div className="mt-3 space-y-2 text-sm">
                <input defaultValue={s.direccion} className="input" />
                <input defaultValue={s.telefono} className="input" />
                <input defaultValue={s.horario} className="input" />
              </div>
              <p className="mt-2 text-[11px] text-white/30">
                Cada sucursal mantiene su propio menú, mesas, eventos, horarios y personal.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <ShieldCheck size={15} className="text-gold" /> Roles y permisos
        </h2>
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#12141B]">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-white/5">
              {roles.map((r) => (
                <tr key={r.rol}>
                  <td className="w-40 px-5 py-3 font-medium text-white">{r.rol}</td>
                  <td className="px-5 py-3 text-white/50">{r.acceso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-white">Código QR por mesa</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {MESAS.map((m) => (
            <div key={m.id} className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-[#12141B] p-4">
              <p className="text-sm font-semibold text-white">Mesa {m.numero}</p>
              <div className="rounded-lg bg-white p-2">
                <QRCodeSVG value={`https://bistromecha.app/mesa/${m.id}?t=${tokens[m.id]}`} size={96} />
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => window.print()}
                  title="Descargar QR"
                  className="rounded-md border border-white/10 p-1.5 text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <Download size={13} />
                </button>
                <button
                  onClick={() => window.print()}
                  title="Imprimir QR"
                  className="rounded-md border border-white/10 p-1.5 text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <Printer size={13} />
                </button>
                <button
                  onClick={() => regenerar(m.id)}
                  title="Regenerar QR"
                  className="rounded-md border border-white/10 p-1.5 text-white/50 hover:bg-white/5 hover:text-white"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #0b0d12;
          padding: 0.55rem 0.75rem;
          font-size: 0.8rem;
          color: white;
        }
        .input:focus {
          outline: none;
          border-color: #c6a15b;
        }
      `}</style>
    </div>
  );
}
