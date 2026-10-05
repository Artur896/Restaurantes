"use client";

import { useState } from "react";
import { Phone, MessageCircle, Instagram, Facebook, MapPin, Clock, Navigation } from "lucide-react";
import { clsx } from "clsx";
import { SUCURSALES } from "@/lib/demo-data";

export default function ContactoPage() {
  const [sucursalId, setSucursalId] = useState(SUCURSALES[0].id);
  const sucursal = SUCURSALES.find((s) => s.id === sucursalId)!;

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contacto</p>
      <h1 className="mt-1 font-serif text-4xl text-cream">Bistró Mecha</h1>
      <p className="mt-2 text-sm text-cream/55">Toluca, Estado de México</p>

      <div className="mt-6 flex gap-2">
        {SUCURSALES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSucursalId(s.id)}
            className={clsx(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              sucursalId === s.id ? "border-gold bg-gold/15 text-gold" : "border-cream/15 text-cream/60"
            )}
          >
            {s.nombre}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl3 card-premium">
        <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-forest/40 via-carbon to-wine/20">
          <div className="absolute inset-0 bg-grain opacity-40" />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
              <MapPin size={22} className="text-gold" />
            </span>
            <p className="text-sm font-medium text-cream/70">Mapa referencial · ubicación por confirmar</p>
          </div>
        </div>
        <div className="p-6">
          <p className="font-serif text-xl text-cream">{sucursal.nombre}</p>
          <p className="mt-1 text-sm text-cream/55">{sucursal.direccion}, {sucursal.ciudad}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${sucursal.lat},${sucursal.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-carbon shadow-glow"
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
        <InfoRow icon={Instagram} label="Instagram" value="@bistromecha (placeholder)" href="#" />
        <InfoRow icon={Facebook} label="Facebook" value="/BistroMecha (placeholder)" href="#" />
        <InfoRow icon={Clock} label="Horario" value={sucursal.horario} />
      </div>

      <p className="mt-6 text-center text-xs text-cream/30">
        * Datos de contacto mostrados como referencia de prototipo. Deberán validarse directamente con Bistró Mecha
        antes de su publicación oficial.
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
    <div className="flex items-center gap-3.5 rounded-2xl border border-cream/10 bg-cream/5 px-4 py-3.5 transition hover:border-gold/30">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-cream/40">{label}</p>
        <p className="text-sm font-medium text-cream">{value}</p>
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
