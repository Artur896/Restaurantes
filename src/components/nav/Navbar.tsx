"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useApp } from "@/lib/store";

const items = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/reservar", label: "Reservar" },
  { href: "/eventos", label: "Eventos" },
  { href: "/mesa", label: "Mi mesa" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const { mesaId } = useApp();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-30 hidden border-b border-cream/10 bg-carbon/80 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-8">
        <Link href="/" className="font-serif text-2xl tracking-wide text-cream">
          Bistró <span className="text-gradient-gold">Mecha</span>
        </Link>
        <nav className="flex items-center gap-8">
          {items.map(({ href, label }) => {
            const target = href === "/mesa" && mesaId ? `/mesa/${mesaId}` : href;
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href === "/mesa" ? "/mesa" : href);
            return (
              <Link
                key={href}
                href={target}
                className={clsx(
                  "relative text-sm font-medium tracking-wide transition-colors",
                  active ? "text-gold" : "text-cream/70 hover:text-cream"
                )}
              >
                {label}
                {active && <span className="absolute -bottom-2 left-0 h-px w-full bg-gold" />}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/cuenta"
            className="rounded-full border border-cream/20 px-4 py-2 text-sm font-medium text-cream/90 transition hover:border-gold/50 hover:text-gold"
          >
            Mi cuenta
          </Link>
          <Link
            href="/reservar"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-carbon shadow-glow transition hover:bg-gold-soft"
          >
            Reservar mesa
          </Link>
        </div>
      </div>
    </header>
  );
}
