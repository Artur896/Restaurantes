"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { SUCURSALES } from "@/lib/demo-data";

const quickLinks = [
  { href: "/", label: "Inicio" },
  { href: "/reservar", label: "Reservar" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/mesa")) return null;

  return (
    <footer className="border-t border-stone-line bg-ivory-soft">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-serif text-xl text-graphite">
              Bistró <span className="text-champagne">Mecha</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-graphite/50">
              Restauramos con amor por medio de experiencias sensoriales extraordinarias.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-graphite/40">Sucursales</p>
            <ul className="mt-3 space-y-2">
              {SUCURSALES.map((s) => (
                <li key={s.id} className="text-sm text-graphite/55">
                  <span className="font-medium text-graphite/70">{s.nombre}</span> — {s.direccion}, {s.ciudad}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-graphite/40">Contacto</p>
            <ul className="mt-3 space-y-2 text-sm text-graphite/55">
              {SUCURSALES.map((s) => (
                <li key={s.id}>
                  <a href={`tel:${s.telefono.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-champagne">
                    <Phone size={13} /> {s.telefono}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`https://wa.me/${SUCURSALES[0].whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-champagne"
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bistromecha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-champagne"
                >
                  <Instagram size={13} /> @bistromecha
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-stone-line pt-6 sm:flex-row sm:justify-between">
          <nav className="flex flex-wrap items-center justify-center gap-5">
            {quickLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs font-medium text-graphite/50 hover:text-graphite">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="text-center text-[11px] text-graphite/35 sm:text-right">
            Prototipo no oficial inspirado en Bistró Mecha — sin acuerdo formal con el restaurante.
          </p>
        </div>
      </div>
    </footer>
  );
}
