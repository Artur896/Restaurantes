"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, ScanLine, Music2, MapPin, Heart, PartyPopper, HeartHandshake, Sparkles, Star } from "lucide-react";
import { EVENTOS, eventoDeHoy, proximosEventos, SUCURSALES } from "@/lib/demo-data";
import { EventHero, EventMiniCard } from "@/components/EventCard";
import { HomeHero } from "@/components/home/HomeHero";
import { Gallery } from "@/components/home/Gallery";

// Copys de esta página (esencia, pilares, celebraciones, reseñas) tomados/adaptados
// de bistromecha.com.mx — ver nota en README.

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const pilares = [
  { n: "01", title: "Amor", desc: "La base de la hospitalidad y el espíritu de la marca.", icon: Heart },
  { n: "02", title: "Celebración", desc: "Transformamos una visita en un momento para recordar.", icon: PartyPopper },
  { n: "03", title: "Servicio", desc: "Atención cercana, cálida y enfocada en el detalle.", icon: HeartHandshake },
  { n: "04", title: "Experiencia", desc: "Sabores, música y espacios que generan conexión emocional.", icon: Sparkles },
];

const celebracionesFeatures = [
  "Espacios con carácter y personalidad.",
  "Opciones para reuniones íntimas o grupos.",
  "Acompañamiento para coordinar tu celebración.",
  "Una experiencia que celebra la vida y el amor.",
];

const sucursalFotos: Record<string, string> = {
  centro: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  "primero-mayo": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=800&auto=format&fit=crop",
};

export default function HomePage() {
  const evento = eventoDeHoy() ?? EVENTOS[0];
  const otrosEventos = proximosEventos(evento?.id);
  const whatsappCotizar = `https://wa.me/${SUCURSALES[0].whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hola, quiero cotizar una celebración en Bistró Mecha."
  )}`;

  return (
    <div>
      <HomeHero />

      {/* Nuestra esencia */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Nuestra esencia</p>
          <h2 className="mt-2 font-serif text-3xl text-graphite sm:text-4xl">
            Hospitalidad, sabor y conexión en cada detalle
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-graphite/55">
            Bistró Mecha nace para restaurar con amor por medio de experiencias sensoriales extraordinarias.
            Creamos espacios para desayunar, comer, cenar, celebrar y disfrutar música en vivo, cuidando la
            calidez del servicio, la personalidad de cada ambiente y la conexión con nuestros invitados.
          </p>
          <p className="mt-5 font-serif text-xl italic text-graphite/80">
            "Celebramos la vida, el amor y los momentos que merecen permanecer en la memoria."
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pilares.map(({ n, title, desc, icon: Icon }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-stone-line bg-white p-6 shadow-silk transition-shadow hover:shadow-silkLg"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-champagne/60">{n}</span>
                <Icon size={18} className="text-champagne" />
              </div>
              <p className="mt-3 font-serif text-lg text-graphite">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-graphite/45">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">En vivo hoy</p>
            <h2 className="mt-1 font-serif text-3xl text-graphite">Hoy en Bistró Mecha</h2>
          </div>
          <Link href="/eventos" className="hidden text-sm font-medium text-graphite/50 hover:text-graphite sm:block">
            Ver todos →
          </Link>
        </div>
        {evento && <EventHero evento={evento} />}

        {otrosEventos.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-graphite/45">Próximos eventos</p>
            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
              {otrosEventos.map((e) => (
                <EventMiniCard key={e.id} evento={e} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-3"
        >
          {[
            { href: "/reservar", icon: CalendarCheck, title: "Reservar mesa", desc: "Elige fecha, hora y mesa" },
            { href: "/eventos", icon: Music2, title: "Eventos en vivo", desc: "Música y experiencias" },
            { href: "/mesa", icon: ScanLine, title: "Mi mesa", desc: "Escanea el QR en el restaurante" },
          ].map(({ href, icon: Icon, title, desc }) => (
            <motion.div key={href} variants={fadeUp} transition={{ duration: 0.5, ease }}>
              <Link
                href={href}
                className="group flex flex-col gap-3 rounded-2xl border border-stone-line bg-white p-6 shadow-silk transition hover:border-champagne/50 hover:shadow-silkLg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne/12 text-champagne transition group-hover:bg-champagne group-hover:text-graphite">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-serif text-lg text-graphite">{title}</p>
                  <p className="text-sm text-graphite/45">{desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Sucursales */}
      <section className="mx-auto max-w-6xl px-5 pb-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease }}
          className="overflow-hidden rounded-xl3 border border-stone-line bg-white p-8 shadow-silk sm:p-10"
        >
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Elige tu Bistró Mecha</p>
            <h2 className="mt-2 font-serif text-3xl text-graphite">Dos espacios, una misma esencia</h2>
            <p className="mt-3 text-sm leading-relaxed text-graphite/50">
              Cada sucursal tiene su propia personalidad, manteniendo el mismo espíritu de servicio, amor y
              celebración.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {SUCURSALES.map((s) => (
              <div
                key={s.id}
                className="group overflow-hidden rounded-2xl border border-stone-line bg-ivory-soft transition hover:border-champagne/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.div className="absolute inset-0" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }}>
                    <Image
                      src={sucursalFotos[s.id]}
                      alt={s.nombre}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 to-transparent" />
                  {s.descriptor && (
                    <p className="absolute bottom-2.5 left-3 right-3 text-[11px] font-semibold uppercase tracking-wider text-champagne-soft">
                      {s.descriptor}
                    </p>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-serif text-lg text-graphite">{s.nombre}</p>
                  <p className="mt-2 text-sm leading-relaxed text-graphite/55">{s.resumen}</p>
                  <p className="mt-3 text-xs text-graphite/40">{s.direccion}</p>
                  {s.idealPara && <p className="mt-1 text-xs text-graphite/35">Ideal para: {s.idealPara}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-champagne hover:text-champagne-soft"
            >
              <MapPin size={15} /> Ver ubicaciones y cómo llegar
            </Link>
          </div>
        </motion.div>
      </section>

      <Gallery />

      {/* Celebraciones */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease }}
          className="relative overflow-hidden rounded-xl3 shadow-silkLg"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop"
              alt="Celebración en Bistró Mecha"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-graphite/85" />
          </div>
          <div className="relative grid gap-8 p-8 sm:grid-cols-2 sm:items-center sm:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Momentos especiales</p>
              <h2 className="mt-2 font-serif text-3xl text-ivory">Celebraciones hechas con detalle y personalidad</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/60">
                En Bistró Mecha acompañamos cumpleaños, aniversarios, reuniones privadas y experiencias memorables
                con un entorno cálido, montaje especial y una atmósfera pensada para compartir.
              </p>
              <a
                href={whatsappCotizar}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-champagne px-5 py-2.5 text-sm font-semibold text-graphite shadow-champagneGlow transition hover:bg-champagne-soft"
              >
                Cotizar celebración
              </a>
            </div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-3"
            >
              {celebracionesFeatures.map((f) => (
                <motion.li key={f} variants={fadeUp} className="flex items-start gap-2.5 text-sm text-ivory/70">
                  <PartyPopper size={15} className="mt-0.5 shrink-0 text-champagne" />
                  {f}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </section>

      {/* Comentarios */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            Lo que dicen nuestros invitados
          </p>
          <h2 className="mt-2 font-serif text-3xl text-graphite">Experiencias que mantienen la Mecha prendida</h2>
          <div className="mt-3 flex items-center justify-center gap-1 text-champagne">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="mt-3 text-sm text-graphite/50">
            Compartimos reseñas de 5 estrellas publicadas por nuestros invitados en Google Maps.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {SUCURSALES.map((s) => (
              <a
                key={s.id}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `Bistró Mecha ${s.nombre} ${s.direccion} ${s.ciudad}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-stone-line bg-white px-4 py-2 text-sm font-medium text-graphite/70 shadow-silk transition hover:border-champagne/50"
              >
                Reseñas {s.nombre}
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
