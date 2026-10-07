"use client";

import Image from "next/image";
import { User, Phone, Mail, CalendarCheck, Heart, History, Music2 } from "lucide-react";
import { CLIENTES, RESERVACIONES, PLATILLOS } from "@/lib/demo-data";
import { useApp } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";

export default function MiCuentaPage() {
  const cliente = CLIENTES[0];
  const { favoritos } = useApp();
  const favoritosPlatillos = PLATILLOS.filter((p) => favoritos.includes(p.id));
  const reservasCliente = RESERVACIONES.filter((r) => cliente.reservaciones.includes(r.id));

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Perfil</p>
      <h1 className="mt-1 font-serif text-4xl text-graphite">Mi cuenta</h1>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-stone-line bg-white p-5 shadow-silk">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne/12 font-serif text-2xl text-champagne">
          {cliente.nombre.charAt(0)}
        </span>
        <div>
          <p className="font-serif text-xl text-graphite">{cliente.nombre}</p>
          <p className="text-xs text-graphite/45">Cliente frecuente · {cliente.visitas} visitas</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-stone-line bg-white p-5 text-sm shadow-silk">
        <div className="flex items-center gap-3 text-graphite/65">
          <User size={15} className="text-champagne" /> {cliente.nombre}
        </div>
        <div className="flex items-center gap-3 text-graphite/65">
          <Phone size={15} className="text-champagne" /> {cliente.telefono}
        </div>
        <div className="flex items-center gap-3 text-graphite/65">
          <Mail size={15} className="text-champagne" /> {cliente.correo}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-graphite/80">
          <CalendarCheck size={15} className="text-champagne" /> Historial de reservaciones
        </h2>
        <div className="space-y-2.5">
          {reservasCliente.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-stone-line bg-white px-4 py-3 shadow-silk">
              <div>
                <p className="text-sm font-medium text-graphite">
                  {r.fecha} · {r.hora} hrs
                </p>
                <p className="text-xs text-graphite/40">{r.personas} personas · {r.ocasion}</p>
              </div>
              <Badge tone={r.estado === "Confirmada" ? "champagne" : r.estado === "Finalizada" ? "neutral" : "forest"}>
                {r.estado}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-graphite/80">
          <Music2 size={15} className="text-champagne" /> Eventos a los que asististe
        </h2>
        <div className="rounded-xl border border-stone-line bg-white px-4 py-3 text-sm text-graphite/50 shadow-silk">
          Viernes de Jazz · Brunch & Music — ¡gracias por ser parte de la experiencia!
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-graphite/80">
          <Heart size={15} className="text-champagne" /> Mis favoritos
        </h2>
        {favoritosPlatillos.length === 0 ? (
          <p className="rounded-xl border border-stone-line bg-white px-4 py-6 text-center text-sm text-graphite/40 shadow-silk">
            Aún no has guardado platillos favoritos. Explora la carta y toca el corazón ♥ en tus platillos preferidos.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {favoritosPlatillos.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-2xl border border-stone-line bg-white shadow-silk">
                <div className="relative aspect-square">
                  <Image src={p.imagen} alt={p.nombre} fill className="object-cover" sizes="200px" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-graphite">{p.nombre}</p>
                  <p className="text-xs text-graphite/40">{p.categoria}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 flex items-center gap-3 rounded-xl border border-stone-line bg-white px-4 py-3 text-sm text-graphite/40 shadow-silk">
        <History size={15} className="text-champagne" />
        Historial completo disponible próximamente desde el panel administrativo del cliente.
      </section>
    </div>
  );
}
