"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

type Categoria = "Todo" | "Centro Histórico" | "Primero de Mayo" | "Celebraciones" | "Productos";

const categorias: Categoria[] = ["Todo", "Centro Histórico", "Primero de Mayo", "Celebraciones", "Productos"];

// Fotografía genérica de stock (Unsplash) a modo de placeholder — las fotos reales
// de cada sucursal/evento deben sustituirla antes de cualquier publicación oficial.
const imagenes: { src: string; categoria: Exclude<Categoria, "Todo">; caption: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    categoria: "Centro Histórico",
    caption: "Centro Histórico · Espacio 01",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop",
    categoria: "Centro Histórico",
    caption: "Centro Histórico · Espacio 02",
  },
  {
    src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1200&auto=format&fit=crop",
    categoria: "Primero de Mayo",
    caption: "Primero de Mayo · Espacio 01",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    categoria: "Primero de Mayo",
    caption: "Primero de Mayo · Espacio 02",
  },
  {
    src: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?q=80&w=1200&auto=format&fit=crop",
    categoria: "Celebraciones",
    caption: "Celebración · Cumpleaños",
  },
  {
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
    categoria: "Celebraciones",
    caption: "Celebración · Aniversario",
  },
  {
    src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1200&auto=format&fit=crop",
    categoria: "Celebraciones",
    caption: "Celebración · Evento privado",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    categoria: "Productos",
    caption: "Producto · Desayuno",
  },
  {
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200&auto=format&fit=crop",
    categoria: "Productos",
    caption: "Producto · Comida",
  },
  {
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",
    categoria: "Productos",
    caption: "Producto · Bebida",
  },
  {
    src: "https://images.unsplash.com/photo-1543007631-283050bb3e8c?q=80&w=1200&auto=format&fit=crop",
    categoria: "Productos",
    caption: "Producto · Postre",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function GalleryCard({
  img,
  index,
  onOpen,
}: {
  img: (typeof imagenes)[number];
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Parallax sutil: filas pares/impares se mueven a ritmos ligeramente distintos.
  const y = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [18, -18] : [-10, 10]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease }}
      className="w-[70vw] shrink-0 snap-start sm:w-[280px]"
    >
      <motion.button
        onClick={onOpen}
        style={{ y }}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-line shadow-silk"
      >
        <motion.div layoutId={`gallery-img-${img.src}`} className="absolute inset-0">
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.08 }} transition={{ duration: 0.7, ease }}>
            <Image
              src={img.src}
              alt={img.caption}
              fill
              sizes="(max-width: 640px) 70vw, 280px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/5 to-transparent" />
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/15 text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn size={14} />
        </span>
        <p className="absolute bottom-3 left-3 right-3 text-left text-sm font-medium text-ivory">{img.caption}</p>
      </motion.button>
    </motion.div>
  );
}

export function Gallery() {
  const [activa, setActiva] = useState<Categoria>("Todo");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const visibles = activa === "Todo" ? imagenes : imagenes.filter((i) => i.categoria === activa);
  const actual = openIndex !== null ? visibles[openIndex] : null;

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % visibles.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + visibles.length) % visibles.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, visibles.length]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Así se vive Bistró Mecha</p>
        <h2 className="mt-2 font-serif text-3xl text-graphite">Vive la experiencia Bistró Mecha</h2>
        <p className="mt-3 text-sm leading-relaxed text-graphite/50">
          Dos escenarios, una misma esencia: espacios, sabores y momentos para celebrar.
        </p>
      </div>

      <div className="no-scrollbar mt-7 flex justify-center gap-2 overflow-x-auto pb-1">
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => {
              setActiva(c);
              setOpenIndex(null);
            }}
            className={clsx(
              "whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition",
              activa === c
                ? "border-graphite bg-graphite text-ivory"
                : "border-stone-line bg-white text-graphite/55 hover:border-champagne/60"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="relative mt-6">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-6 pt-2"
        >
          {visibles.map((img, i) => (
            <GalleryCard key={img.src + img.caption} img={img} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>

        <button
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-stone-line bg-white/90 p-2.5 text-graphite shadow-silk backdrop-blur transition hover:border-champagne/50 sm:flex"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Siguiente"
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-stone-line bg-white/90 p-2.5 text-graphite shadow-silk backdrop-blur transition hover:border-champagne/50 sm:flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Lightbox premium con transición de elemento compartido */}
      <AnimatePresence>
        {actual && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-graphite/90 backdrop-blur-md"
              onClick={() => setOpenIndex(null)}
            />

            <button
              onClick={() => setOpenIndex(null)}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition hover:bg-ivory/20"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
            <button
              onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + visibles.length) % visibles.length))}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition hover:bg-ivory/20 sm:left-6"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % visibles.length))}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition hover:bg-ivory/20 sm:right-6"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              layoutId={`gallery-img-${actual.src}`}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="relative z-[5] aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-silkLg sm:aspect-[3/4]"
            >
              <Image src={actual.src} alt={actual.caption} fill sizes="90vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-transparent to-transparent" />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="absolute bottom-4 left-4 right-4 text-sm font-medium text-ivory"
              >
                {actual.caption}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
