"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Music2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop",
    alt: "Interior cálido de Bistró Mecha por la noche",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop",
    alt: "Mesa servida en Bistró Mecha",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1920&auto=format&fit=crop",
    alt: "Ambiente de celebración en Bistró Mecha",
  },
];

export function HomeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[88dvh] items-end overflow-hidden sm:min-h-[90vh]">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[index].src}
              alt={heroImages[index].alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-graphite/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Imagen ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-champagne" : "w-1.5 bg-ivory/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-champagne"
        >
          Toluca, Estado de México
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          className="font-serif text-5xl leading-[1.05] text-ivory sm:text-7xl"
        >
          Bistró Mecha
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.22 }}
          className="mt-3 font-serif text-xl italic text-champagne-soft sm:text-2xl"
        >
          Restauramos con amor.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.32 }}
          className="mt-4 max-w-md text-sm leading-relaxed text-ivory/75 sm:text-base"
        >
          Experiencias gastronómicas, música en vivo y momentos para celebrar la vida en cada visita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Link
            href="/reservar"
            className="flex items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3.5 text-sm font-semibold text-graphite shadow-champagneGlow transition active:scale-95"
          >
            <CalendarCheck size={16} /> Reservar mesa
          </Link>
          <Link
            href="/eventos"
            className="flex items-center justify-center gap-2 rounded-full border border-ivory/30 bg-ivory/5 px-6 py-3.5 text-sm font-semibold text-ivory backdrop-blur-sm transition active:scale-95"
          >
            <Music2 size={16} /> Ver eventos
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-14 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="h-9 w-5 rounded-full border border-ivory/30 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="block h-1.5 w-1.5 rounded-full bg-champagne"
          />
        </span>
      </motion.div>
    </section>
  );
}
