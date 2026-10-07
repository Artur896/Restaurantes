"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Equal, Wallet, Receipt, SlidersHorizontal } from "lucide-react";
import { clsx } from "clsx";
import { MESAS, formatCurrency } from "@/lib/demo-data";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/Button";

type Modo = "mitad" | "entre3" | "entre4" | "productos" | "personalizado" | "todo";

export default function DividirCuentaPage() {
  const params = useParams<{ id: string }>();
  const mesa = MESAS.find((m) => m.id === params.id);
  const { carrito, totalCarrito } = useApp();
  const [modo, setModo] = useState<Modo>("mitad");
  const [personalizado, setPersonalizado] = useState(0);

  const iva = Math.round(totalCarrito * 0.16);
  const total = totalCarrito + iva;

  const partes = modo === "entre3" ? 3 : modo === "entre4" ? 4 : 2;
  const porPersona = total / partes;

  if (!mesa) return null;

  return (
    <div className="mx-auto max-w-xl px-5 pb-20 pt-10 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Mesa {mesa.numero}</p>
      <h1 className="mt-1 font-serif text-4xl text-graphite">¿Cómo quieres dividir tu cuenta?</h1>
      <p className="mt-2 text-sm text-graphite/50">Total de la cuenta: {formatCurrency(total)}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <OptionCard active={modo === "mitad"} onClick={() => setModo("mitad")} icon={Equal} label="50% / 50%" />
        <OptionCard active={modo === "entre3"} onClick={() => setModo("entre3")} icon={Users} label="Dividir entre 3" />
        <OptionCard active={modo === "entre4"} onClick={() => setModo("entre4")} icon={Users} label="Dividir entre 4" />
        <OptionCard
          active={modo === "productos"}
          onClick={() => setModo("productos")}
          icon={Receipt}
          label="Dividir por productos"
        />
        <OptionCard
          active={modo === "personalizado"}
          onClick={() => setModo("personalizado")}
          icon={SlidersHorizontal}
          label="Cantidad personalizada"
        />
        <OptionCard active={modo === "todo"} onClick={() => setModo("todo")} icon={Wallet} label="Yo pago todo" />
      </div>

      <motion.div
        key={modo}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-2xl border border-champagne/25 bg-champagne/5 p-6"
      >
        {modo === "mitad" && (
          <ResultadoSimple titulo="Cada quien paga" monto={total / 2} nota="50% / 50% del total" />
        )}
        {(modo === "entre3" || modo === "entre4") && (
          <ResultadoSimple
            titulo="Cada persona paga"
            monto={porPersona}
            nota={`Dividido entre ${partes} personas`}
          />
        )}
        {modo === "todo" && <ResultadoSimple titulo="Pagas el total" monto={total} nota="Yo pago todo" />}
        {modo === "personalizado" && (
          <div>
            <p className="mb-2 text-sm font-semibold text-graphite/70">¿Cuánto quieres pagar?</p>
            <input
              type="number"
              min={0}
              max={total}
              value={personalizado}
              onChange={(e) => setPersonalizado(Number(e.target.value))}
              placeholder="$0"
              className="w-full rounded-xl border border-stone-line bg-white px-4 py-3 text-lg text-graphite placeholder:text-graphite/30 focus:border-champagne focus:outline-none"
            />
            <p className="mt-2 text-xs text-graphite/40">
              Restante: {formatCurrency(Math.max(0, total - personalizado))}
            </p>
          </div>
        )}
        {modo === "productos" && (
          <div>
            <p className="mb-3 text-sm font-semibold text-graphite/70">Selecciona lo que vas a pagar</p>
            {carrito.length === 0 ? (
              <p className="text-sm text-graphite/40">No hay productos en la cuenta todavía.</p>
            ) : (
              <SeleccionProductos />
            )}
          </div>
        )}
      </motion.div>

      <Button variant="noir" fullWidth size="lg" className="mt-6">
        Confirmar división
      </Button>
    </div>
  );
}

function OptionCard({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center gap-2.5 rounded-2xl border px-3 py-5 text-center shadow-silk transition active:scale-95",
        active ? "border-graphite bg-graphite" : "border-stone-line bg-white hover:border-champagne/50"
      )}
    >
      <Icon size={22} className={active ? "text-champagne" : "text-graphite/55"} />
      <span className={clsx("text-sm font-medium", active ? "text-ivory" : "text-graphite")}>{label}</span>
    </button>
  );
}

function ResultadoSimple({ titulo, monto, nota }: { titulo: string; monto: number; nota: string }) {
  return (
    <div className="text-center">
      <p className="text-sm text-graphite/55">{titulo}</p>
      <p className="mt-1 font-serif text-4xl text-graphite">{formatCurrency(monto)}</p>
      <p className="mt-1 text-xs text-graphite/40">{nota}</p>
    </div>
  );
}

function SeleccionProductos() {
  const { carrito } = useApp();
  const [seleccion, setSeleccion] = useState<string[]>([]);

  function toggle(id: string) {
    setSeleccion((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  const total = useMemo(
    () => carrito.filter((i) => seleccion.includes(i.platilloId)).reduce((a, i) => a + i.precio * i.cantidad, 0),
    [carrito, seleccion]
  );

  return (
    <div>
      <div className="space-y-2">
        {carrito.map((item) => (
          <label
            key={item.platilloId}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-stone-line bg-white px-3.5 py-2.5 text-sm"
          >
            <span className="flex items-center gap-2.5 text-graphite">
              <input
                type="checkbox"
                checked={seleccion.includes(item.platilloId)}
                onChange={() => toggle(item.platilloId)}
                className="h-4 w-4 accent-[#C9A96A]"
              />
              {item.nombre} ×{item.cantidad}
            </span>
            <span className="text-graphite/55">{formatCurrency(item.precio * item.cantidad)}</span>
          </label>
        ))}
      </div>
      <p className="mt-3 text-right font-serif text-xl text-graphite">{formatCurrency(total)}</p>
    </div>
  );
}
