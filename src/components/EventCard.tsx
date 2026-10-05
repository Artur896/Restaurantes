"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Music2, Users } from "lucide-react";
import type { Evento } from "@/lib/types";

const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function diaLabel(fecha: string) {
  const d = new Date(fecha + "T00:00:00");
  return diasSemana[d.getDay()];
}

export function EventHero({ evento }: { evento: Evento }) {
  const ocupacion = Math.round((evento.confirmados / evento.capacidad) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-xl3 shadow-premium"
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/8]">
        <Image src={evento.imagen} alt={evento.nombre} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-8">
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          <Music2 size={13} /> {evento.tipo}
        </span>
        <h3 className="max-w-md font-serif text-3xl leading-tight text-cream sm:text-4xl">{evento.nombre}</h3>
        <p className="font-sans text-sm font-medium text-cream/70">
          {diaLabel(evento.fecha)} · {evento.hora} hrs · {evento.artista}
        </p>
        <p className="max-w-sm text-sm text-cream/60">{evento.descripcion}</p>
        <div className="flex items-center gap-3 text-xs text-cream/50">
          <Users size={13} />
          <span>
            {evento.confirmados}/{evento.capacidad} confirmados
          </span>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-cream/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${ocupacion}%` }} />
          </div>
        </div>
        <Link
          href={`/reservar?evento=${evento.id}`}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-carbon shadow-glow transition hover:bg-gold-soft active:scale-95"
        >
          Reservar para este evento
        </Link>
      </div>
    </motion.div>
  );
}

export function EventMiniCard({ evento }: { evento: Evento }) {
  return (
    <Link
      href={`/eventos`}
      className="group relative flex min-w-[220px] flex-col overflow-hidden rounded-2xl card-premium"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={evento.imagen}
          alt={evento.nombre}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="220px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">{diaLabel(evento.fecha)}</p>
          <p className="font-serif text-lg leading-tight text-cream">{evento.nombre}</p>
          <p className="text-xs text-cream/60">{evento.hora} hrs</p>
        </div>
      </div>
    </Link>
  );
}
