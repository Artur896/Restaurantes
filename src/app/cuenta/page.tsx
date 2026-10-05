"use client";

import Image from "next/image";
import { User, Phone, Mail, CalendarCheck, Heart, History, Music2 } from "lucide-react";
import { CLIENTES, RESERVACIONES, PLATILLOS, formatCurrency } from "@/lib/demo-data";
import { useApp } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";

export default function MiCuentaPage() {
  const cliente = CLIENTES[0];
  const { favoritos } = useApp();
  const favoritosPlatillos = PLATILLOS.filter((p) => favoritos.includes(p.id));
  const reservasCliente = RESERVACIONES.filter((r) => cliente.reservaciones.includes(r.id));

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Perfil</p>
      <h1 className="mt-1 font-serif text-4xl text-cream">Mi cuenta</h1>

      <div className="mt-6 flex items-center gap-4 rounded-2xl card-premium p-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 font-serif text-2xl text-gold">
          {cliente.nombre.charAt(0)}
        </span>
        <div>
          <p className="font-serif text-xl text-cream">{cliente.nombre}</p>
          <p className="text-xs text-cream/50">Cliente frecuente · {cliente.visitas} visitas</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-cream/10 bg-cream/5 p-5 text-sm">
        <div className="flex items-center gap-3 text-cream/70">
          <User size={15} className="text-gold" /> {cliente.nombre}
        </div>
        <div className="flex items-center gap-3 text-cream/70">
          <Phone size={15} className="text-gold" /> {cliente.telefono}
        </div>
        <div className="flex items-center gap-3 text-cream/70">
          <Mail size={15} className="text-gold" /> {cliente.correo}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cream/80">
          <CalendarCheck size={15} className="text-gold" /> Historial de reservaciones
        </h2>
        <div className="space-y-2.5">
          {reservasCliente.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-cream/10 bg-cream/5 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-cream">
                  {r.fecha} · {r.hora} hrs
                </p>
                <p className="text-xs text-cream/40">{r.personas} personas · {r.ocasion}</p>
              </div>
              <Badge tone={r.estado === "Confirmada" ? "gold" : r.estado === "Finalizada" ? "neutral" : "forest"}>
                {r.estado}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cream/80">
          <Music2 size={15} className="text-gold" /> Eventos a los que asististe
        </h2>
        <div className="rounded-xl border border-cream/10 bg-cream/5 px-4 py-3 text-sm text-cream/50">
          Viernes de Jazz · Brunch & Music — ¡gracias por ser parte de la experiencia!
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cream/80">
          <Heart size={15} className="text-gold" /> Mis favoritos
        </h2>
        {favoritosPlatillos.length === 0 ? (
          <p className="rounded-xl border border-cream/10 bg-cream/5 px-4 py-6 text-center text-sm text-cream/40">
            Aún no has guardado platillos favoritos. Explora el menú y toca el corazón ♥ en tus platillos preferidos.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {favoritosPlatillos.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-2xl card-premium">
                <div className="relative aspect-square">
                  <Image src={p.imagen} alt={p.nombre} fill className="object-cover" sizes="200px" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-cream">{p.nombre}</p>
                  <p className="text-xs text-gold">{formatCurrency(p.precio)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/5 px-4 py-3 text-sm text-cream/40">
        <History size={15} className="text-gold" />
        Historial completo disponible próximamente desde el panel administrativo del cliente.
      </section>
    </div>
  );
}
