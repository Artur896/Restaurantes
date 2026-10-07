"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, Receipt, CheckCircle2 } from "lucide-react";
import { MESAS, formatCurrency } from "@/lib/demo-data";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/Button";

const propinas = [10, 15, 20];

export default function CuentaPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const mesa = MESAS.find((m) => m.id === params.id);
  const { carrito, cambiarCantidad, quitarDelCarrito, totalCarrito, solicitarCuenta, cuentaSolicitada } = useApp();
  const [propina, setPropina] = useState<number | "otra" | null>(15);
  const [propinaManual, setPropinaManual] = useState(0);
  const [pagado, setPagado] = useState(false);

  const subtotal = totalCarrito;
  const iva = Math.round(subtotal * 0.16);
  const montoPropina = useMemo(() => {
    if (propina === "otra") return propinaManual;
    if (typeof propina === "number") return Math.round(subtotal * (propina / 100));
    return 0;
  }, [propina, propinaManual, subtotal]);
  const total = subtotal + iva + montoPropina;

  if (!mesa) return null;

  if (pagado) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-24 text-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/12"
        >
          <CheckCircle2 size={36} className="text-emerald-600" />
        </motion.span>
        <h1 className="mt-5 font-serif text-3xl text-graphite">¡Gracias por tu visita!</h1>
        <p className="mt-2 text-sm text-graphite/50">
          Tu pago de {formatCurrency(total)} fue procesado. Esperamos verte pronto en Bistró Mecha.
        </p>
        <Link href="/" className="mt-6 rounded-full bg-graphite px-6 py-3 text-sm font-semibold text-ivory">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 pb-28 pt-10 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Mesa {mesa.numero}</p>
      <h1 className="mt-1 font-serif text-4xl text-graphite">Tu cuenta</h1>

      {carrito.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-stone-line bg-white p-8 text-center shadow-silk">
          <Receipt className="mx-auto mb-3 text-graphite/25" size={28} />
          <p className="text-sm text-graphite/50">Aún no tienes productos en tu cuenta.</p>
        </div>
      ) : (
        <>
          <div className="mt-6 divide-y divide-stone-line rounded-2xl border border-stone-line bg-white shadow-silk">
            {carrito.map((item) => (
              <div key={item.platilloId} className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div>
                  <p className="text-sm font-medium text-graphite">{item.nombre}</p>
                  <p className="text-xs text-graphite/40">{formatCurrency(item.precio)} c/u</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cambiarCantidad(item.platilloId, -1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-line text-graphite/60 hover:bg-graphite/5"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-4 text-center text-sm text-graphite">{item.cantidad}</span>
                  <button
                    onClick={() => cambiarCantidad(item.platilloId, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-line text-graphite/60 hover:bg-graphite/5"
                  >
                    <Plus size={12} />
                  </button>
                  <span className="ml-2 w-16 text-right text-sm font-semibold text-graphite">
                    {formatCurrency(item.precio * item.cantidad)}
                  </span>
                  <button
                    onClick={() => quitarDelCarrito(item.platilloId)}
                    className="ml-1 text-graphite/30 hover:text-wine"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 rounded-2xl border border-stone-line bg-white p-5 text-sm shadow-silk">
            <div className="flex justify-between text-graphite/55">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-graphite/55">
              <span>IVA (16%)</span>
              <span>{formatCurrency(iva)}</span>
            </div>
            <div className="flex justify-between text-graphite/55">
              <span>Propina</span>
              <span>{formatCurrency(montoPropina)}</span>
            </div>
            <div className="flex justify-between border-t border-stone-line pt-2 font-serif text-lg text-graphite">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-graphite/70">Propina</p>
            <div className="flex flex-wrap gap-2">
              {propinas.map((p) => (
                <button
                  key={p}
                  onClick={() => setPropina(p)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    propina === p
                      ? "border-graphite bg-graphite text-ivory"
                      : "border-stone-line bg-white text-graphite/55"
                  }`}
                >
                  {p}%
                </button>
              ))}
              <button
                onClick={() => setPropina("otra")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  propina === "otra"
                    ? "border-graphite bg-graphite text-ivory"
                    : "border-stone-line bg-white text-graphite/55"
                }`}
              >
                Otra cantidad
              </button>
            </div>
            {propina === "otra" && (
              <input
                type="number"
                min={0}
                value={propinaManual}
                onChange={(e) => setPropinaManual(Number(e.target.value))}
                placeholder="Monto de propina"
                className="mt-3 w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-sm text-graphite placeholder:text-graphite/30 focus:border-champagne focus:outline-none"
              />
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outlineLight" onClick={solicitarCuenta} disabled={cuentaSolicitada}>
              {cuentaSolicitada ? "Cuenta solicitada ✓" : "Solicitar cuenta"}
            </Button>
            <Button variant="outlineLight" onClick={() => router.push(`/mesa/${mesa.id}/dividir`)}>
              Dividir cuenta
            </Button>
          </div>
          <Button variant="noir" fullWidth size="lg" className="mt-3" onClick={() => setPagado(true)}>
            Pagar {formatCurrency(total)}
          </Button>
        </>
      )}
    </div>
  );
}
