"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Receipt, CheckCircle2 } from "lucide-react";
import { MESAS, formatCurrency } from "@/lib/demo-data";

export default function AdminCuentasPage() {
  const cuentasIniciales = MESAS.filter((m) => m.estado === "Ocupada");
  const [cerradas, setCerradas] = useState<string[]>([]);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-serif text-2xl text-white">Cuentas abiertas</h1>
        <p className="text-sm text-white/40">{cuentasIniciales.length} mesas con cuenta activa.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#12141B]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-white/30">
              <th className="px-5 py-3 font-medium">Mesa</th>
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Desde</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {cuentasIniciales.map((m) => {
              const cerrada = cerradas.includes(m.id);
              return (
                <tr key={m.id}>
                  <td className="px-5 py-3.5 font-medium text-white">Mesa {m.numero}</td>
                  <td className="px-5 py-3.5 text-white/60">{m.clienteActual}</td>
                  <td className="px-5 py-3.5 text-white/60">{m.horaOcupacion}</td>
                  <td className="px-5 py-3.5 font-semibold text-gold">{formatCurrency(m.cuentaTotal ?? 0)}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={clsx(
                        "rounded-full px-2.5 py-1 text-xs",
                        cerrada ? "bg-emerald-900/30 text-emerald-300" : "bg-white/5 text-white/60"
                      )}
                    >
                      {cerrada ? "Pagada" : "Abierta"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setCerradas((c) => [...c, m.id])}
                      disabled={cerrada}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/5 disabled:opacity-30"
                    >
                      {cerrada ? <CheckCircle2 size={13} /> : <Receipt size={13} />}
                      {cerrada ? "Cerrada" : "Marcar pagada"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
