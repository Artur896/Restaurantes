"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useApp } from "@/lib/store";

// La Carta no se muestra en la navegación (sin referencias visibles por ahora).
const items = [
  { href: "/", label: "Inicio" },
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
    <header className="fixed inset-x-0 top-0 z-30 hidden border-b border-stone-line bg-ivory/85 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-8">
        <Link href="/" className="font-serif text-2xl tracking-wide text-graphite">
          Bistró <span className="text-gradient-champagne">Mecha</span>
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
                  active ? "text-graphite" : "text-graphite/50 hover:text-graphite"
                )}
              >
                {label}
                {active && <span className="absolute -bottom-2 left-0 h-px w-full bg-champagne" />}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/reservar"
            className="rounded-full bg-graphite px-5 py-2.5 text-sm font-semibold text-ivory shadow-silk transition hover:bg-graphite-soft"
          >
            Reservar mesa
          </Link>
        </div>
      </div>
    </header>
  );
}
