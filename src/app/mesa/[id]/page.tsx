"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Receipt,
  SplitSquareHorizontal,
  ConciergeBell,
  Droplets,
  IceCreamCone,
  Wallet,
  Music2,
} from "lucide-react";
import { MESAS, eventoDeHoy } from "@/lib/demo-data";
import { useApp } from "@/lib/store";

export default function MesaHubPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { setMesa, solicitarAyuda } = useApp();
  const [confirm, setConfirm] = useState<string | null>(null);

  const mesa = MESAS.find((m) => m.id === params.id);
  const evento = mesa ? eventoDeHoy(mesa.sucursalId) : undefined;

  useEffect(() => {
    if (mesa) setMesa(mesa.id);
  }, [mesa, setMesa]);

  if (!mesa) {
    return (
      <div className="mx-auto max-w-md px-5 pt-24 text-center">
        <p className="font-serif text-2xl text-graphite">Mesa no encontrada</p>
        <button onClick={() => router.push("/mesa")} className="mt-4 text-sm text-champagne underline">
          Volver a seleccionar mesa
        </button>
      </div>
    );
  }

  function accionRapida(label: string, tipo: Parameters<typeof solicitarAyuda>[0]) {
    solicitarAyuda(tipo);
    setConfirm(label);
    setTimeout(() => setConfirm(null), 2500);
  }

  const acciones: { label: string; icon: typeof Receipt; href: string }[] = [
    { label: "Ver cuenta", icon: Receipt, href: `/mesa/${mesa.id}/cuenta` },
    { label: "Dividir cuenta", icon: SplitSquareHorizontal, href: `/mesa/${mesa.id}/dividir` },
  ];

  const rapidas = [
    { label: "Solicitar mesero", icon: ConciergeBell, tipo: "Llamar al mesero" as const },
    { label: "Más agua", icon: Droplets, tipo: "Más agua" as const },
    { label: "Pedir postre", icon: IceCreamCone, tipo: "Otra cosa" as const },
    { label: "Dejar propina", icon: Wallet, tipo: "Cuenta" as const },
  ];

  return (
    <div className="pb-20">
      <section className="relative flex h-[34vh] min-h-[220px] items-end overflow-hidden sm:h-[40vh]">
        <Image
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1600&auto=format&fit=crop"
          alt={`Mesa ${mesa.numero} en Bistró Mecha`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto w-full max-w-2xl px-5 pb-7 text-center sm:px-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne">Bienvenido a tu mesa</p>
          <h1 className="mt-2 font-serif text-4xl text-ivory">Mesa {mesa.numero}</h1>
          <p className="mt-1 text-sm text-ivory/70">{mesa.zona} · Disfruta la experiencia.</p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-2xl px-5 pt-8 sm:px-8">
      {evento && (
        <Link
          href="/eventos"
          className="mt-4 flex items-center gap-3 rounded-2xl border border-stone-line bg-white p-4 transition hover:border-champagne/40"
        >
          <Music2 className="shrink-0 text-champagne" size={20} />
          <div className="text-sm">
            <p className="font-semibold text-graphite">{evento.nombre} · hoy {evento.hora} hrs</p>
            <p className="text-graphite/45">Toca para ver el evento de hoy</p>
          </div>
        </Link>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3">
        {acciones.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-stone-line bg-white py-7 text-center shadow-silk transition hover:border-champagne/50 hover:shadow-silkLg active:scale-95"
          >
            <Icon size={24} className="text-champagne" />
            <span className="text-sm font-semibold text-graphite">{label}</span>
          </Link>
        ))}
      </div>

      <p className="mb-3 mt-8 text-sm font-semibold text-graphite/45">Acciones rápidas</p>
      <div className="grid grid-cols-4 gap-2.5">
        {rapidas.map(({ label, icon: Icon, tipo }) => (
          <button
            key={label}
            onClick={() => accionRapida(label, tipo)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-stone-line bg-white py-4 text-center shadow-silk transition hover:border-champagne/50 active:scale-95"
          >
            <Icon size={19} className="text-graphite/60" />
            <span className="text-[11px] font-medium text-graphite/60">{label}</span>
          </button>
        ))}
      </div>

      {confirm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-5 bottom-24 z-40 mx-auto max-w-sm rounded-2xl bg-graphite px-5 py-3.5 text-center text-sm font-semibold text-ivory shadow-silkLg md:bottom-8"
        >
          "{confirm}" enviado — un miembro de nuestro equipo te atenderá en breve.
        </motion.div>
      )}
      </div>
    </div>
  );
}
