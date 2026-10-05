"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  ShoppingBag,
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
  const { setMesa, mesaId, itemsCount, solicitarAyuda } = useApp();
  const [confirm, setConfirm] = useState<string | null>(null);

  const mesa = MESAS.find((m) => m.id === params.id);
  const evento = mesa ? eventoDeHoy(mesa.sucursalId) : undefined;

  useEffect(() => {
    if (mesa) setMesa(mesa.id);
  }, [mesa, setMesa]);

  if (!mesa) {
    return (
      <div className="mx-auto max-w-md px-5 pt-24 text-center">
        <p className="font-serif text-2xl text-cream">Mesa no encontrada</p>
        <button onClick={() => router.push("/mesa")} className="mt-4 text-sm text-gold underline">
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

  const acciones: { label: string; icon: typeof UtensilsCrossed; href: string; badge?: number }[] = [
    { label: "Ver menú", icon: UtensilsCrossed, href: "/menu" },
    { label: "Agregar productos", icon: ShoppingBag, href: "/menu", badge: itemsCount },
    { label: "Mi cuenta", icon: Receipt, href: `/mesa/${mesa.id}/cuenta` },
    { label: "Dividir cuenta", icon: SplitSquareHorizontal, href: `/mesa/${mesa.id}/dividir` },
  ];

  const rapidas = [
    { label: "Solicitar mesero", icon: ConciergeBell, tipo: "Llamar al mesero" as const },
    { label: "Más agua", icon: Droplets, tipo: "Más agua" as const },
    { label: "Pedir postre", icon: IceCreamCone, tipo: "Otra cosa" as const },
    { label: "Dejar propina", icon: Wallet, tipo: "Cuenta" as const },
  ];

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl3 border border-gold/20 bg-gradient-to-br from-gold/10 to-transparent p-6 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Bienvenido a tu mesa</p>
        <h1 className="mt-2 font-serif text-4xl text-cream">Mesa {mesa.numero}</h1>
        <p className="mt-1 text-sm text-cream/55">{mesa.zona} · Disfruta la experiencia.</p>
      </motion.div>

      {evento && (
        <Link
          href="/eventos"
          className="mt-4 flex items-center gap-3 rounded-2xl border border-cream/10 bg-cream/5 p-4 transition hover:border-gold/30"
        >
          <Music2 className="shrink-0 text-gold" size={20} />
          <div className="text-sm">
            <p className="font-semibold text-cream">{evento.nombre} · hoy {evento.hora} hrs</p>
            <p className="text-cream/50">Toca para ver el evento de hoy</p>
          </div>
        </Link>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3">
        {acciones.map(({ label, icon: Icon, href, badge }) => (
          <Link
            key={label}
            href={href}
            className="relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-cream/10 bg-cream/5 py-7 text-center transition hover:border-gold/40 hover:bg-cream/10 active:scale-95"
          >
            {!!badge && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-wine text-[10px] font-semibold text-cream">
                {badge}
              </span>
            )}
            <Icon size={26} className="text-gold" />
            <span className="text-sm font-semibold text-cream">{label}</span>
          </Link>
        ))}
      </div>

      <p className="mb-3 mt-8 text-sm font-semibold text-cream/50">Acciones rápidas</p>
      <div className="grid grid-cols-4 gap-2.5">
        {rapidas.map(({ label, icon: Icon, tipo }) => (
          <button
            key={label}
            onClick={() => accionRapida(label, tipo)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-cream/10 bg-cream/5 py-4 text-center transition hover:border-gold/40 active:scale-95"
          >
            <Icon size={20} className="text-cream/70" />
            <span className="text-[11px] font-medium text-cream/70">{label}</span>
          </button>
        ))}
      </div>

      {confirm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-5 bottom-24 z-40 mx-auto max-w-sm rounded-2xl bg-gold px-5 py-3.5 text-center text-sm font-semibold text-carbon shadow-premium md:bottom-8"
        >
          "{confirm}" enviado — un miembro de nuestro equipo te atenderá en breve.
        </motion.div>
      )}
    </div>
  );
}
