"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Music2 } from "lucide-react";
import type { Evento } from "@/lib/types";
import { Badge } from "./ui/Badge";

const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export function EventFullCard({ evento }: { evento: Evento }) {
  const d = new Date(evento.fecha + "T00:00:00");
  const ocupacion = Math.round((evento.confirmados / evento.capacidad) * 100);

  return (
    <div className="flex gap-4 overflow-hidden rounded-2xl card-premium p-3">
      <div className="relative h-full w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
        <Image src={evento.imagen} alt={evento.nombre} fill className="object-cover" sizes="150px" />
      </div>
      <div className="flex flex-1 flex-col py-1 pr-2">
        <Badge tone="gold" className="w-fit">
          <Music2 size={10} /> {evento.tipo}
        </Badge>
        <p className="mt-2 font-serif text-lg leading-tight text-cream">{evento.nombre}</p>
        <p className="text-xs text-cream/50">
          {diasSemana[d.getDay()]} {d.getDate()} · {evento.hora}–{evento.horaFin} hrs
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-cream/50">{evento.descripcion}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="flex items-center gap-1 text-[11px] text-cream/40">
            <Users size={11} /> {ocupacion}% lleno
          </span>
          <Link
            href={`/reservar?evento=${evento.id}`}
            className="rounded-full bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold hover:text-carbon"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
