"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { QRCodeSVG } from "qrcode.react";
import {
  Check,
  Users,
  MapPin,
  PartyPopper,
  Music2,
  ChevronRight,
} from "lucide-react";
import { SUCURSALES, HORARIOS_RESERVA, EVENTOS, eventoDeHoy } from "@/lib/demo-data";
import type { Ocasion, Zona } from "@/lib/types";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";

const ocasiones: Ocasion[] = [
  "Cumpleaños",
  "Aniversario",
  "Cena romántica",
  "Reunión familiar",
  "Cena con amigos",
  "Negocios",
  "Otra",
];

const zonas: Zona[] = ["Salón", "Terraza", "Jardín", "Zona preferente", "Cerca del escenario", "Sin preferencia"];

function proximosDias(n: number) {
  const dias = [];
  const nombres = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dias.push({
      iso: d.toISOString().slice(0, 10),
      label: nombres[d.getDay()],
      numero: d.getDate(),
      hoy: i === 0,
    });
  }
  return dias;
}

const estadoStyles: Record<string, string> = {
  Disponible: "border-emerald-700/40 bg-emerald-900/10 text-emerald-200 hover:border-emerald-500/60",
  "Pocas mesas": "border-amber-700/40 bg-amber-900/10 text-amber-200 hover:border-amber-500/60",
  "No disponible": "border-cream/5 bg-cream/[0.02] text-cream/20 cursor-not-allowed",
};

export function ReservarForm() {
  const searchParams = useSearchParams();
  const eventoIdParam = searchParams.get("evento");
  const dias = useMemo(() => proximosDias(10), []);

  const [sucursalId, setSucursalId] = useState(SUCURSALES[0].id);
  const [fecha, setFecha] = useState(dias[0].iso);
  const [personas, setPersonas] = useState(2);
  const [ocasion, setOcasion] = useState<Ocasion>("Cena con amigos");
  const [zona, setZona] = useState<Zona>("Sin preferencia");
  const [comentarios, setComentarios] = useState("");
  const [hora, setHora] = useState<string | null>(null);
  const [showContacto, setShowContacto] = useState(false);
  const [showExito, setShowExito] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const eventoParam = eventoIdParam ? EVENTOS.find((e) => e.id === eventoIdParam) : undefined;
  const eventoDia = eventoParam ?? eventoDeHoy(sucursalId);
  const mostrarEvento = eventoDia && eventoDia.fecha === fecha;

  function elegirHora(h: string, estado: string) {
    if (estado === "No disponible") return;
    setHora(h);
    setShowContacto(true);
  }

  function confirmar() {
    const nuevoCodigo = `BM-${Math.floor(10000 + Math.random() * 89999)}`;
    setCodigo(nuevoCodigo);
    setShowContacto(false);
    setShowExito(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pb-32 pt-10 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Reservaciones</p>
      <h1 className="mt-1 font-serif text-4xl text-cream">Reserva tu mesa</h1>
      <p className="mt-2 text-sm text-cream/55">
        Elige sucursal, fecha, hora y cuéntanos para qué ocasión nos visitas.
      </p>

      {mostrarEvento && eventoDia && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4"
        >
          <Music2 className="shrink-0 text-gold" size={22} />
          <div className="text-sm">
            <p className="font-semibold text-gold">Esta noche tenemos {eventoDia.nombre.toLowerCase()}</p>
            <p className="text-cream/60">
              {eventoDia.hora} hrs · Reserva tu mesa y disfruta el show.
            </p>
          </div>
        </motion.div>
      )}

      {/* Sucursal */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cream/80">
          <MapPin size={15} className="text-gold" /> Sucursal
        </h2>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SUCURSALES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSucursalId(s.id)}
              className={clsx(
                "rounded-2xl border px-4 py-3 text-left transition",
                sucursalId === s.id ? "border-gold bg-gold/10" : "border-cream/10 bg-cream/5 hover:border-cream/25"
              )}
            >
              <p className="font-serif text-base text-cream">{s.nombre}</p>
              <p className="text-xs text-cream/50">{s.direccion}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Fecha */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-cream/80">Fecha</h2>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {dias.map((d) => (
            <button
              key={d.iso}
              onClick={() => setFecha(d.iso)}
              className={clsx(
                "flex min-w-[56px] flex-col items-center gap-1 rounded-2xl border px-3 py-2.5 transition",
                fecha === d.iso ? "border-gold bg-gold/10 text-gold" : "border-cream/10 text-cream/60 hover:border-cream/25"
              )}
            >
              <span className="text-[10px] font-medium uppercase">{d.hoy ? "Hoy" : d.label}</span>
              <span className="font-serif text-lg">{d.numero}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Personas */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cream/80">
          <Users size={15} className="text-gold" /> Número de personas
        </h2>
        <div className="flex items-center gap-4 rounded-2xl border border-cream/10 bg-cream/5 px-5 py-3.5 w-fit">
          <button
            onClick={() => setPersonas((p) => Math.max(1, p - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-lg text-cream/70 hover:bg-cream/10"
          >
            −
          </button>
          <span className="w-8 text-center font-serif text-xl text-cream">{personas}</span>
          <button
            onClick={() => setPersonas((p) => Math.min(20, p + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-lg text-cream/70 hover:bg-cream/10"
          >
            +
          </button>
        </div>
      </section>

      {/* Ocasion */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cream/80">
          <PartyPopper size={15} className="text-gold" /> Tipo de ocasión
        </h2>
        <div className="flex flex-wrap gap-2">
          {ocasiones.map((o) => (
            <button
              key={o}
              onClick={() => setOcasion(o)}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 text-sm transition",
                ocasion === o ? "border-gold bg-gold/15 text-gold" : "border-cream/15 text-cream/60 hover:border-cream/30"
              )}
            >
              {o}
            </button>
          ))}
        </div>
      </section>

      {/* Zona */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-cream/80">Preferencia de zona</h2>
        <div className="flex flex-wrap gap-2">
          {zonas.map((z) => (
            <button
              key={z}
              onClick={() => setZona(z)}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 text-sm transition",
                zona === z ? "border-gold bg-gold/15 text-gold" : "border-cream/15 text-cream/60 hover:border-cream/30"
              )}
            >
              {z}
            </button>
          ))}
        </div>
      </section>

      {/* Comentarios */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-cream/80">Comentarios especiales</h2>
        <textarea
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          placeholder="Alergias, celebraciones, silla para bebé..."
          rows={3}
          className="w-full resize-none rounded-2xl border border-cream/10 bg-cream/5 p-4 text-sm text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none"
        />
      </section>

      {/* Horarios */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-cream/80">Disponibilidad</h2>
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {HORARIOS_RESERVA.map(({ hora: h, estado }) => (
            <button
              key={h}
              onClick={() => elegirHora(h, estado)}
              className={clsx(
                "flex flex-col items-center gap-0.5 rounded-xl border px-2 py-3 text-sm font-semibold transition",
                estadoStyles[estado]
              )}
            >
              {h}
              <span className="text-[10px] font-normal opacity-80">{estado}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-cream/40">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Disponible</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Pocas mesas</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cream/20" /> No disponible</span>
        </div>
      </section>

      {/* Bottom sheet: contacto */}
      <BottomSheet open={showContacto} onClose={() => setShowContacto(false)} title="Confirma tu reserva">
        <div className="space-y-3 rounded-2xl border border-cream/10 bg-cream/5 p-4 text-sm text-cream/70">
          <p>
            <span className="text-cream/40">Sucursal: </span>
            {SUCURSALES.find((s) => s.id === sucursalId)?.nombre}
          </p>
          <p>
            <span className="text-cream/40">Fecha: </span>
            {fecha} · <span className="text-cream/40">Hora:</span> {hora}
          </p>
          <p>
            <span className="text-cream/40">Personas: </span>
            {personas} · <span className="text-cream/40">Ocasión:</span> {ocasion}
          </p>
          <p>
            <span className="text-cream/40">Zona: </span>
            {zona}
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            className="w-full rounded-xl border border-cream/10 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none"
          />
          <input
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
            className="w-full rounded-xl border border-cream/10 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none"
          />
          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full rounded-xl border border-cream/10 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none"
          />
        </div>
        <Button fullWidth size="lg" className="mt-5" onClick={confirmar} disabled={!nombre || !telefono}>
          Confirmar reserva <ChevronRight size={16} />
        </Button>
      </BottomSheet>

      {/* Bottom sheet: exito */}
      <BottomSheet open={showExito} onClose={() => setShowExito(false)}>
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15"
          >
            <Check size={36} className="text-gold" />
          </motion.span>
          <div>
            <p className="font-serif text-2xl text-cream">¡Tu mesa está reservada!</p>
            <p className="mt-1 text-sm text-cream/60">
              {fecha} · {hora} hrs · {personas} personas
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <QRCodeSVG value={`BISTRO-MECHA|${codigo}|${fecha}|${hora}`} size={160} />
          </div>
          <p className="font-sans text-sm tracking-[0.2em] text-gold">{codigo}</p>
          <p className="max-w-xs text-xs text-cream/40">
            Muestra este código al llegar. Te enviamos la confirmación a {correo || "tu correo"}.
          </p>
          <Button fullWidth size="lg" onClick={() => setShowExito(false)}>
            Listo
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
