"use client";

import Link from "next/link";
import { QrCode, ScanLine } from "lucide-react";
import { MESAS } from "@/lib/demo-data";
import { useApp } from "@/lib/store";

export default function MesaLandingPage() {
  const { mesaId } = useApp();

  if (mesaId) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-24 text-center">
        <p className="text-sm text-cream/50">Ya tienes una mesa activa.</p>
        <Link
          href={`/mesa/${mesaId}`}
          className="mt-4 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-carbon shadow-glow"
        >
          Ir a mi mesa
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-20 pt-16 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
        <ScanLine size={28} />
      </span>
      <h1 className="mt-5 font-serif text-3xl text-cream">Escanea el QR de tu mesa</h1>
      <p className="mt-2 text-sm text-cream/55">
        Cada mesa de Bistró Mecha tiene un código QR único. Escanéalo con tu cámara para abrir tu experiencia
        digital. Para esta demostración, elige una mesa manualmente:
      </p>

      <div className="mt-8 grid grid-cols-4 gap-2.5 sm:grid-cols-5">
        {MESAS.map((m) => (
          <Link
            key={m.id}
            href={`/mesa/${m.id}`}
            className="flex flex-col items-center gap-1 rounded-2xl border border-cream/10 bg-cream/5 py-3 text-cream/70 transition hover:border-gold/40 hover:text-gold"
          >
            <QrCode size={16} />
            <span className="text-xs font-semibold">{m.numero}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
