"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, UtensilsCrossed, Music2, UserRound } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  return (
    <section className="relative flex min-h-[92dvh] items-end overflow-hidden sm:min-h-screen">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop"
          alt="Interior cálido de Bistró Mecha por la noche"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/70 to-carbon/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold"
        >
          Toluca, Estado de México
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          className="font-serif text-5xl leading-[1.05] text-cream sm:text-7xl"
        >
          Bistró Mecha
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.22 }}
          className="mt-3 font-serif text-xl italic text-gold-soft sm:text-2xl"
        >
          Restauramos con amor.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.32 }}
          className="mt-4 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base"
        >
          Gastronomía, experiencias y momentos que merecen quedarse.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
        >
          <Link
            href="/reservar"
            className="flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-carbon shadow-glow transition active:scale-95 sm:px-6"
          >
            <CalendarCheck size={16} /> Reservar mesa
          </Link>
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 rounded-full border border-cream/25 bg-carbon/30 px-5 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition active:scale-95 sm:px-6"
          >
            <UtensilsCrossed size={16} /> Ver menú
          </Link>
          <Link
            href="/eventos"
            className="flex items-center justify-center gap-2 rounded-full border border-cream/25 bg-carbon/30 px-5 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition active:scale-95 sm:px-6"
          >
            <Music2 size={16} /> Eventos de hoy
          </Link>
          <Link
            href="/cuenta"
            className="flex items-center justify-center gap-2 rounded-full border border-cream/25 bg-carbon/30 px-5 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition active:scale-95 sm:px-6"
          >
            <UserRound size={16} /> Mi cuenta
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="h-9 w-5 rounded-full border border-cream/30 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="block h-1.5 w-1.5 rounded-full bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
