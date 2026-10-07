"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { QRCodeSVG } from "qrcode.react";
import {
  Check,
  Users,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Music2,
  CalendarDays,
  Clock3,
  Armchair,
  Sparkles,
  PartyPopper,
  Mail,
} from "lucide-react";
import { SUCURSALES, MESAS, BLOQUES_HORARIO, EVENTOS, eventoDeHoy } from "@/lib/demo-data";
import type { Mesa, EstadoMesa, Ocasion } from "@/lib/types";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { TableMap, formaMesa } from "@/components/reserva/TableMap";
import { HoldTimer } from "@/components/reserva/HoldTimer";
import { useApp, MESA_HOLD_DURATION_MS } from "@/lib/store";

const STEPS = ["fecha", "hora", "personas", "mesa", "datos", "confirmacion"] as const;
type Step = (typeof STEPS)[number];

const STEP_LABEL: Record<Step, string> = {
  fecha: "Fecha",
  hora: "Horario",
  personas: "Personas",
  mesa: "Mesa",
  datos: "Tus datos",
  confirmacion: "Confirmación",
};

const ocasiones: Ocasion[] = [
  "Cumpleaños",
  "Aniversario",
  "Cena romántica",
  "Reunión familiar",
  "Cena con amigos",
  "Negocios",
  "Otra",
];

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

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
};

export function ReservarForm() {
  const searchParams = useSearchParams();
  const eventoIdParam = searchParams.get("evento");
  const dias = useMemo(() => proximosDias(10), []);
  const { mesaHold, iniciarHoldMesa, liberarHoldMesa } = useApp();

  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const step = STEPS[stepIndex];

  const [sucursalId, setSucursalId] = useState(SUCURSALES[0].id);
  const [fecha, setFecha] = useState(dias[0].iso);
  const [bloque, setBloque] = useState(BLOQUES_HORARIO[3]); // 19:00–21:00 por defecto
  const [personas, setPersonas] = useState(2);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);
  const [mesaPreview, setMesaPreview] = useState<Mesa | null>(null);
  const [restauradoDeHold, setRestauradoDeHold] = useState(false);

  const [showExito, setShowExito] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [ocasion, setOcasion] = useState<Ocasion>("Cena con amigos");
  const [comentarios, setComentarios] = useState("");

  const eventoParam = eventoIdParam ? EVENTOS.find((e) => e.id === eventoIdParam) : undefined;
  const eventoDia = eventoParam ?? eventoDeHoy(sucursalId);
  const mostrarEvento = eventoDia && eventoDia.fecha === fecha;

  const mesasSucursal = useMemo(
    () => MESAS.filter((m) => m.sucursalId === sucursalId && m.capacidad >= Math.min(personas, 2)),
    [sucursalId, personas]
  );

  // Mantiene mesaSeleccionada sincronizada con el hold persistido en el store:
  // si hay un hold activo que no corresponde a la mesa local (p.ej. tras
  // recargar la página), la restaura y adelanta el flujo; si el hold expira
  // mientras el usuario sigue adelante, regresa al mapa automáticamente.
  useEffect(() => {
    if (mesaHold) {
      if (mesaSeleccionada?.id !== mesaHold.mesaId) {
        const mesa = MESAS.find((m) => m.id === mesaHold.mesaId);
        if (mesa) {
          setMesaSeleccionada(mesa);
          if (!restauradoDeHold) goTo(STEPS.indexOf("datos"));
        }
      }
      setRestauradoDeHold(true);
    } else if (mesaSeleccionada) {
      setMesaSeleccionada(null);
      if (step === "datos" || step === "confirmacion") goTo(STEPS.indexOf("mesa"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesaHold]);

  function goTo(index: number) {
    setDirection(index > stepIndex ? 1 : -1);
    setStepIndex(index);
  }
  function next() {
    goTo(Math.min(STEPS.length - 1, stepIndex + 1));
  }
  function back() {
    goTo(Math.max(0, stepIndex - 1));
  }

  function elegirMesaPreview(mesa: Mesa, estado: EstadoMesa) {
    if (estado !== "Disponible") return;
    setMesaPreview(mesa);
  }

  function confirmarSeleccionMesa() {
    if (!mesaPreview) return;
    setMesaSeleccionada(mesaPreview);
    iniciarHoldMesa(mesaPreview.id);
    setMesaPreview(null);
    next();
  }

  function confirmarReserva() {
    const nuevoCodigo = `BM-${Math.floor(10000 + Math.random() * 89999)}`;
    setCodigo(nuevoCodigo);
    liberarHoldMesa();
    setShowExito(true);
  }

  const canContinue: Record<Step, boolean> = {
    fecha: !!fecha,
    hora: !!bloque,
    personas: personas > 0,
    mesa: !!mesaSeleccionada,
    datos: !!nombre && /\S+@\S+\.\S+/.test(correo),
    confirmacion: true,
  };

  const holdActivo = mesaHold && mesaSeleccionada && mesaHold.mesaId === mesaSeleccionada.id ? mesaHold : null;

  return (
    <div className="pb-32">
      <section className="relative flex h-[42vh] min-h-[280px] items-end overflow-hidden sm:h-[48vh]">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop"
          alt="Mesa puesta en Bistró Mecha"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/45 to-graphite/10" />
        <div className="relative z-10 mx-auto w-full max-w-2xl px-5 pb-8 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Reservaciones</p>
          <h1 className="mt-1.5 font-serif text-4xl text-ivory sm:text-5xl">Reserva tu mesa</h1>
          <p className="mt-2 max-w-sm text-sm text-ivory/70">
            Elige fecha, horario, personas y selecciona tu mesa en el plano del restaurante.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-5 pt-8 sm:px-8">
      {mostrarEvento && eventoDia && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-3 rounded-2xl border border-champagne/30 bg-champagne/10 p-4"
        >
          <Music2 className="shrink-0 text-champagne" size={20} />
          <div className="text-sm">
            <p className="font-semibold text-graphite">Esta noche tenemos {eventoDia.nombre.toLowerCase()}</p>
            <p className="text-graphite/55">{eventoDia.hora} hrs · Reserva tu mesa y disfruta el show.</p>
          </div>
        </motion.div>
      )}

      {/* Progreso */}
      <div className="mt-8 flex items-center gap-1.5">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={clsx(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i <= stepIndex ? "bg-graphite" : "bg-stone-line"
            )}
          />
        ))}
      </div>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-graphite/40">
        Paso {stepIndex + 1} de {STEPS.length} · {STEP_LABEL[step]}
      </p>

      {holdActivo && (
        <div className="mt-5">
          <HoldTimer expiresAt={holdActivo.expiresAt} />
        </div>
      )}

      <div className="relative mt-6 min-h-[360px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === "fecha" && (
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-graphite/80">
                  <MapPin size={15} className="text-champagne" /> Sucursal
                </h2>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {SUCURSALES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSucursalId(s.id)}
                      className={clsx(
                        "rounded-2xl border px-4 py-3 text-left transition",
                        sucursalId === s.id
                          ? "border-graphite bg-graphite text-ivory"
                          : "border-stone-line bg-white text-graphite hover:border-champagne/60"
                      )}
                    >
                      <p className="font-serif text-base">{s.nombre}</p>
                      <p className={clsx("text-xs", sucursalId === s.id ? "text-ivory/60" : "text-graphite/45")}>
                        {s.direccion}
                      </p>
                    </button>
                  ))}
                </div>

                <h2 className="mb-3 mt-8 flex items-center gap-2 text-sm font-semibold text-graphite/80">
                  <CalendarDays size={15} className="text-champagne" /> Fecha
                </h2>
                <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                  {dias.map((d) => (
                    <button
                      key={d.iso}
                      onClick={() => setFecha(d.iso)}
                      className={clsx(
                        "flex min-w-[56px] flex-col items-center gap-1 rounded-2xl border px-3 py-2.5 transition",
                        fecha === d.iso
                          ? "border-graphite bg-graphite text-ivory"
                          : "border-stone-line bg-white text-graphite/70 hover:border-champagne/60"
                      )}
                    >
                      <span className="text-[10px] font-medium uppercase">{d.hoy ? "Hoy" : d.label}</span>
                      <span className="font-serif text-lg">{d.numero}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {step === "hora" && (
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-graphite/80">
                  <Clock3 size={15} className="text-champagne" /> Horario (bloques de 2 horas)
                </h2>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {BLOQUES_HORARIO.map((b) => (
                    <button
                      key={b.inicio}
                      onClick={() => setBloque(b)}
                      className={clsx(
                        "rounded-2xl border px-3 py-3.5 text-sm font-semibold transition",
                        bloque.inicio === b.inicio
                          ? "border-graphite bg-graphite text-ivory"
                          : "border-stone-line bg-white text-graphite/80 hover:border-champagne/60"
                      )}
                    >
                      {b.inicio} — {b.fin}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-graphite/40">
                  Cada reservación tiene una duración de 2 horas. Tu mesa se libera automáticamente al terminar el
                  bloque.
                </p>
              </section>
            )}

            {step === "personas" && (
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-graphite/80">
                  <Users size={15} className="text-champagne" /> Número de personas
                </h2>
                <div className="flex w-fit items-center gap-5 rounded-2xl border border-stone-line bg-white px-6 py-4">
                  <button
                    onClick={() => setPersonas((p) => Math.max(1, p - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-line text-lg text-graphite/70 transition hover:border-champagne hover:text-graphite"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-serif text-2xl text-graphite">{personas}</span>
                  <button
                    onClick={() => setPersonas((p) => Math.min(20, p + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-line text-lg text-graphite/70 transition hover:border-champagne hover:text-graphite"
                  >
                    +
                  </button>
                </div>
              </section>
            )}

            {step === "mesa" && (
              <section>
                <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold text-graphite/80">
                  <Armchair size={15} className="text-champagne" /> Selecciona tu mesa
                </h2>
                <p className="mb-4 text-[11px] text-graphite/45">
                  {fecha} · {bloque.inicio}–{bloque.fin} hrs · {personas} {personas === 1 ? "persona" : "personas"}
                </p>
                <TableMap
                  mesas={mesasSucursal}
                  fecha={fecha}
                  bloque={bloque}
                  personas={personas}
                  selectedMesaId={mesaSeleccionada?.id ?? null}
                  onSelectMesa={elegirMesaPreview}
                />
              </section>
            )}

            {step === "datos" && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-graphite/80">Tus datos de contacto</h2>
                <div className="space-y-3 rounded-2xl border border-stone-line bg-white p-4 text-sm text-graphite/60">
                  <p>
                    <span className="text-graphite/35">Mesa: </span>
                    {mesaSeleccionada ? `#${mesaSeleccionada.numero} · ${mesaSeleccionada.zona}` : "—"}
                  </p>
                  <p>
                    <span className="text-graphite/35">Fecha: </span>
                    {fecha} · <span className="text-graphite/35">Horario:</span> {bloque.inicio}–{bloque.fin}
                  </p>
                  <p>
                    <span className="text-graphite/35">Personas: </span>
                    {personas}
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-graphite/50">
                      <Mail size={13} className="text-champagne" /> Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="tucorreo@ejemplo.com"
                      className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm text-graphite placeholder:text-graphite/30 focus:border-champagne focus:outline-none"
                    />
                    <p className="mt-1.5 text-[11px] text-graphite/40">
                      Tu reservación se confirma e identifica con este correo — ahí recibirás tu código y los
                      detalles de la mesa.
                    </p>
                  </div>
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm text-graphite placeholder:text-graphite/30 focus:border-champagne focus:outline-none"
                  />
                  <input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Teléfono (opcional)"
                    className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm text-graphite placeholder:text-graphite/30 focus:border-champagne focus:outline-none"
                  />
                </div>

                <h2 className="mb-3 mt-6 flex items-center gap-2 text-sm font-semibold text-graphite/80">
                  <PartyPopper size={15} className="text-champagne" /> Tipo de ocasión
                </h2>
                <div className="flex flex-wrap gap-2">
                  {ocasiones.map((o) => (
                    <button
                      key={o}
                      onClick={() => setOcasion(o)}
                      className={clsx(
                        "rounded-full border px-3.5 py-1.5 text-sm transition",
                        ocasion === o
                          ? "border-graphite bg-graphite text-ivory"
                          : "border-stone-line bg-white text-graphite/60 hover:border-champagne/60"
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>

                <h2 className="mb-3 mt-6 text-sm font-semibold text-graphite/80">Comentarios especiales</h2>
                <textarea
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  placeholder="Alergias, celebraciones, silla para bebé..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-stone-line bg-white p-4 text-sm text-graphite placeholder:text-graphite/30 focus:border-champagne focus:outline-none"
                />
              </section>
            )}

            {step === "confirmacion" && (
              <section className="flex flex-col items-center gap-2 py-4 text-center">
                <Sparkles className="text-champagne" size={28} />
                <p className="font-serif text-2xl text-graphite">Todo listo para confirmar</p>
                <p className="max-w-xs text-sm text-graphite/50">
                  Revisa los detalles de tu reserva y confirma para recibir tu código de acceso.
                </p>
                <div className="mt-3 w-full space-y-2 rounded-2xl border border-stone-line bg-white p-4 text-left text-sm text-graphite/65">
                  <p>
                    <span className="text-graphite/35">Nombre: </span>
                    {nombre}
                  </p>
                  <p>
                    <span className="text-graphite/35">Correo: </span>
                    {correo}
                  </p>
                  <p>
                    <span className="text-graphite/35">Mesa: </span>#{mesaSeleccionada?.numero} ·{" "}
                    {mesaSeleccionada?.zona}
                  </p>
                  <p>
                    <span className="text-graphite/35">Fecha: </span>
                    {fecha} · {bloque.inicio}–{bloque.fin} hrs
                  </p>
                  <p>
                    <span className="text-graphite/35">Personas: </span>
                    {personas}
                  </p>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación entre pasos */}
      <div className="mt-8 flex items-center gap-3">
        {stepIndex > 0 && (
          <Button variant="outlineLight" size="md" onClick={back}>
            <ChevronLeft size={16} /> Atrás
          </Button>
        )}
        {step !== "confirmacion" ? (
          <Button variant="noir" size="md" className="flex-1" disabled={!canContinue[step]} onClick={next}>
            Continuar <ChevronRight size={16} />
          </Button>
        ) : (
          <Button variant="champagne" size="md" className="flex-1" onClick={confirmarReserva}>
            Confirmar reserva <ChevronRight size={16} />
          </Button>
        )}
      </div>

      {/* Bottom sheet: detalle de mesa al tocar */}
      <BottomSheet open={!!mesaPreview} onClose={() => setMesaPreview(null)} tone="light">
        {mesaPreview && (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
                Mesa {mesaPreview.numero}
              </p>
              <h3 className="mt-1 font-serif text-2xl text-graphite">
                {mesaPreview.capacidad} personas · {formaMesa(mesaPreview.capacidad)}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-graphite/55">
              <span className="rounded-full border border-stone-line bg-white px-3 py-1">{mesaPreview.zona}</span>
              {mesaPreview.zona === "Cerca del escenario" && (
                <span className="rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 text-champagne">
                  Vista al escenario
                </span>
              )}
              <span className="rounded-full border border-stone-line bg-white px-3 py-1">
                {bloque.inicio} — {bloque.fin}
              </span>
            </div>
            <p className="text-sm font-medium text-graphite/70">Disponible</p>
            <Button variant="noir" size="lg" fullWidth onClick={confirmarSeleccionMesa}>
              Seleccionar esta mesa
            </Button>
            <p className="text-center text-[11px] text-graphite/35">
              Tu mesa quedará apartada {Math.round(MESA_HOLD_DURATION_MS / 60000)} minutos mientras completas tu
              reservación.
            </p>
          </div>
        )}
      </BottomSheet>

      {/* Bottom sheet: exito */}
      <BottomSheet open={showExito} onClose={() => setShowExito(false)} tone="light">
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-champagne/15"
          >
            <Check size={36} className="text-champagne" />
          </motion.span>
          <div>
            <p className="font-serif text-2xl text-graphite">¡Tu mesa está reservada!</p>
            <p className="mt-1 text-sm text-graphite/55">
              {fecha} · {bloque.inicio}–{bloque.fin} hrs · {personas} personas
            </p>
          </div>
          <div className="rounded-2xl border border-stone-line bg-white p-4">
            <QRCodeSVG value={`BISTRO-MECHA|${codigo}|${fecha}|${bloque.inicio}`} size={160} />
          </div>
          <p className="font-sans text-sm tracking-[0.2em] text-champagne">{codigo}</p>
          <p className="max-w-xs text-xs text-graphite/40">
            Muestra este código al llegar. Te enviamos la confirmación a {correo || "tu correo"}.
          </p>
          <Button variant="noir" fullWidth size="lg" onClick={() => setShowExito(false)}>
            Listo
          </Button>
        </div>
      </BottomSheet>
      </div>
    </div>
  );
}
