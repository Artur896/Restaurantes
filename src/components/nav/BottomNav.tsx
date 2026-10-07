"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Music2, Receipt } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

// La Carta no se muestra en la navegación (sin referencias visibles por ahora).
const items = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/reservar", label: "Reservar", icon: CalendarDays },
  { href: "/eventos", label: "Eventos", icon: Music2 },
  { href: "/mesa", label: "Mi mesa", icon: Receipt },
];

export function BottomNav() {
  const pathname = usePathname();
  const { mesaId, itemsCount } = useApp();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-line bg-ivory/90 backdrop-blur-xl safe-bottom md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const target = href === "/mesa" && mesaId ? `/mesa/${mesaId}` : href;
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href === "/mesa" ? "/mesa" : href);
          return (
            <Link
              key={href}
              href={target}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10.5px] font-medium tracking-wide"
            >
              <span className="relative">
                <Icon
                  size={21}
                  strokeWidth={active ? 2.3 : 1.6}
                  className={clsx("transition-colors", active ? "text-graphite" : "text-graphite/35")}
                />
                {href === "/mesa" && itemsCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-[9px] font-semibold text-graphite">
                    {itemsCount}
                  </span>
                )}
              </span>
              <span className={clsx("transition-colors", active ? "text-graphite" : "text-graphite/35")}>{label}</span>
              {active && (
                <motion.span
                  layoutId="bottom-nav-active"
                  className="absolute top-0 h-0.5 w-8 rounded-full bg-champagne"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
