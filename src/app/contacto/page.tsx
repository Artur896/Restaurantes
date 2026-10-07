"use client";

import { useState } from "react";
import { Phone, MessageCircle, Instagram, MapPin, Clock, Navigation, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { SUCURSALES } from "@/lib/demo-data";

export default function ContactoPage() {
  const [sucursalId, setSucursalId] = useState(SUCURSALES[0].id);
  const sucursal = SUCURSALES.find((s) => s.id === sucursalId)!;

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Contacto</p>
      <h1 className="mt-1 font-serif text-4xl text-graphite">Bistró Mecha</h1>
      <p className="mt-2 text-sm text-graphite/50">Toluca, Estado de México</p>

      <div className="mt-6 flex gap-2">
        {SUCURSALES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSucursalId(s.id)}
            className={clsx(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              sucursalId === s.id
                ? "border-graphite bg-graphite text-ivory"
                : "border-stone-line bg-white text-graphite/55"
            )}
          >
            {s.nombre}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl3 border border-stone-line bg-white shadow-silk">
        <div className="relative flex aspect-[16/9] items-center justify-center bg-ivory-soft">
          <div className="absolute inset-0 bg-grain opacity-40" />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne/15">
              <MapPin size={22} className="text-champagne" />
            </span>
            <p className="text-sm font-medium text-graphite/55">Mapa referencial · ubicación por confirmar</p>
          </div>
        </div>
        <div className="p-6">
          {sucursal.descriptor && (
            <p className="text-xs font-semibold uppercase tracking-wider text-champagne">{sucursal.descriptor}</p>
          )}
          <p className="mt-1 font-serif text-xl text-graphite">{sucursal.nombre}</p>
          <p className="mt-1 text-sm text-graphite/50">{sucursal.direccion}, {sucursal.ciudad}</p>
          {sucursal.resumen && <p className="mt-2 text-sm leading-relaxed text-graphite/55">{sucursal.resumen}</p>}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${sucursal.lat},${sucursal.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-graphite px-5 py-2.5 text-sm font-semibold text-ivory shadow-silk"
          >
            <Navigation size={15} /> Cómo llegar
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <InfoRow icon={Phone} label="Teléfono" value={sucursal.telefono} href={`tel:${sucursal.telefono.replace(/\s/g, "")}`} />
        <InfoRow
          icon={MessageCircle}
          label="WhatsApp"
          value={sucursal.whatsapp}
          href={`https://wa.me/${sucursal.whatsapp.replace(/\D/g, "")}`}
        />
        <InfoRow
          icon={Instagram}
          label="Instagram"
          value="@bistromecha"
          href="https://www.instagram.com/bistromecha"
        />
        <InfoRow icon={Clock} label="Horario" value={sucursal.horario} />
        {sucursal.idealPara && <InfoRow icon={Sparkles} label="Ideal para" value={sucursal.idealPara} />}
      </div>

      <p className="mt-6 text-center text-xs text-graphite/30">
        * Dirección, teléfono, WhatsApp e Instagram tomados de bistromecha.com.mx. El horario es estimado y debe
        confirmarse directamente con el restaurante antes de cualquier publicación oficial.
      </p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3.5 rounded-2xl border border-stone-line bg-white px-4 py-3.5 shadow-silk transition hover:border-champagne/40">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne/12 text-champagne">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-graphite/40">{label}</p>
        <p className="text-sm font-medium text-graphite">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
