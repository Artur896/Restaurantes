"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  CalendarDays,
  LayoutGrid,
  UtensilsCrossed,
  Music2,
  ClipboardList,
  Receipt,
  Users,
  Bell,
  Settings,
  Menu as MenuIcon,
  X,
  ArrowLeft,
} from "lucide-react";
import { NOTIFICACIONES } from "@/lib/demo-data";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reservaciones", label: "Reservaciones", icon: CalendarDays },
  { href: "/admin/mesas", label: "Mesas", icon: LayoutGrid },
  { href: "/admin/menu", label: "Menú", icon: UtensilsCrossed },
  { href: "/admin/eventos", label: "Eventos", icon: Music2 },
  { href: "/admin/pedidos", label: "Pedidos", icon: ClipboardList },
  { href: "/admin/cuentas", label: "Cuentas", icon: Receipt },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const noLeidas = NOTIFICACIONES.filter((n) => !n.leida).length;
  const current = nav.find((n) => (n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)));

  return (
    <div className="min-h-dvh bg-[#0B0D12] font-sans text-[#E7E9EE]">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/5 bg-[#0E1016] lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-white/5 px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-sm font-bold text-carbon">
            BM
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Bistró Mecha</p>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Panel administrativo</p>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active ? "bg-gold/15 text-gold" : "text-white/55 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={17} />
                {label}
                {href === "/admin/notificaciones" && noLeidas > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-wine text-[10px] font-semibold text-white">
                    {noLeidas}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/5 p-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-medium text-white/40 hover:text-white">
            <ArrowLeft size={14} /> Volver al sitio del cliente
          </Link>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-[#0E1016] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Bistró Mecha Admin</p>
              <button onClick={() => setOpen(false)} className="text-white/60">
                <X size={18} />
              </button>
            </div>
            <nav className="space-y-0.5">
              {nav.map(({ href, label, icon: Icon }) => {
                const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      active ? "bg-gold/15 text-gold" : "text-white/55"
                    )}
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-white/5 bg-[#0B0D12]/90 px-5 backdrop-blur-xl">
          <button onClick={() => setOpen(true)} className="text-white/60 lg:hidden">
            <MenuIcon size={20} />
          </button>
          <p className="font-medium text-white">{current?.label ?? "Dashboard"}</p>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/admin/notificaciones" className="relative text-white/60 hover:text-white">
              <Bell size={18} />
              {noLeidas > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-wine text-[9px] font-semibold text-white">
                  {noLeidas}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-xs font-semibold text-gold">
                AD
              </span>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-medium text-white">Admin Demo</p>
                <p className="text-[10px] text-white/40">Administrador</p>
              </div>
            </div>
          </div>
        </header>
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
