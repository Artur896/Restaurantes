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
        <p className="text-sm text-graphite/50">Ya tienes una mesa activa.</p>
        <Link
          href={`/mesa/${mesaId}`}
          className="mt-4 rounded-full bg-graphite px-6 py-3 text-sm font-semibold text-ivory shadow-silk"
        >
          Ir a mi mesa
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-20 pt-16 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-champagne/12 text-champagne">
        <ScanLine size={28} />
      </span>
      <h1 className="mt-5 font-serif text-3xl text-graphite">Escanea el QR de tu mesa</h1>
      <p className="mt-2 text-sm text-graphite/50">
        Cada mesa de Bistró Mecha tiene un código QR único. Escanéalo con tu cámara para abrir tu experiencia
        digital. Para esta demostración, elige una mesa manualmente:
      </p>

      <div className="mt-8 grid grid-cols-4 gap-2.5 sm:grid-cols-5">
        {MESAS.map((m) => (
          <Link
            key={m.id}
            href={`/mesa/${m.id}`}
            className="flex flex-col items-center gap-1 rounded-2xl border border-stone-line bg-white py-3 text-graphite/60 shadow-silk transition hover:border-champagne/50 hover:text-champagne"
          >
            <QrCode size={16} />
            <span className="text-xs font-semibold">{m.numero}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
