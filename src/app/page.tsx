import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, UtensilsCrossed, Music2, UserRound, MapPin } from "lucide-react";
import { EVENTOS, PLATILLOS, eventoDeHoy, proximosEventos, SUCURSALES } from "@/lib/demo-data";
import { EventHero, EventMiniCard } from "@/components/EventCard";
import { DishCard } from "@/components/DishCard";
import { HomeHero } from "@/components/home/HomeHero";

export default function HomePage() {
  const evento = eventoDeHoy() ?? EVENTOS[0];
  const otrosEventos = proximosEventos(evento?.id);
  const destacados = PLATILLOS.filter((p) => p.etiquetas.includes("Más pedido")).slice(0, 4);

  return (
    <div>
      <HomeHero />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">En vivo hoy</p>
            <h2 className="mt-1 font-serif text-3xl text-cream">Hoy en Bistró Mecha</h2>
          </div>
          <Link href="/eventos" className="hidden text-sm font-medium text-cream/60 hover:text-gold sm:block">
            Ver todos →
          </Link>
        </div>
        {evento && <EventHero evento={evento} />}

        {otrosEventos.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-cream/50">Próximos eventos</p>
            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
              {otrosEventos.map((e) => (
                <EventMiniCard key={e.id} evento={e} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Favoritos de la casa</p>
            <h2 className="mt-1 font-serif text-3xl text-cream">Los más pedidos</h2>
          </div>
          <Link href="/menu" className="hidden text-sm font-medium text-cream/60 hover:text-gold sm:block">
            Ver menú completo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {destacados.map((p) => (
            <DishCard key={p.id} platillo={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/reservar", icon: CalendarCheck, title: "Reservar mesa", desc: "Elige fecha, hora y zona" },
            { href: "/menu", icon: UtensilsCrossed, title: "Menú digital", desc: "Explora cada categoría" },
            { href: "/eventos", icon: Music2, title: "Eventos en vivo", desc: "Música y experiencias" },
            { href: "/cuenta", icon: UserRound, title: "Mi cuenta", desc: "Historial y favoritos" },
          ].map(({ href, icon: Icon, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-2xl card-premium p-6 transition hover:border-gold/30"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-carbon">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-serif text-lg text-cream">{title}</p>
                <p className="text-sm text-cream/50">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="overflow-hidden rounded-xl3 card-premium p-8 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Nuestras sucursales</p>
              <h2 className="mt-2 font-serif text-3xl text-cream">Dos espacios, una misma esencia</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/55">
                Selecciona la sucursal más cercana para ver su menú, horarios y disponibilidad de mesas en tiempo real.
              </p>
              <Link
                href="/contacto"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-soft"
              >
                <MapPin size={15} /> Cómo llegar
              </Link>
            </div>
            <div className="grid gap-3">
              {SUCURSALES.map((s) => (
                <div key={s.id} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
                  <p className="font-serif text-lg text-cream">{s.nombre}</p>
                  <p className="text-xs text-cream/50">{s.direccion}</p>
                  <p className="mt-1 text-xs text-cream/40">{s.horario}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
