import {
  CalendarCheck,
  Users,
  LayoutGrid,
  CircleDot,
  DollarSign,
  ClipboardList,
  Music2,
} from "lucide-react";
import {
  RESERVACIONES,
  MESAS,
  VENTAS_SEMANA,
  PLATILLOS_MAS_VENDIDOS,
  OCUPACION_HORARIO,
  eventoDeHoy,
  formatCurrency,
} from "@/lib/demo-data";
import { StatCard } from "@/components/admin/StatCard";
import { BarChart, HorizontalBarChart, LineChart } from "@/components/admin/charts";

const hoyISO = new Date().toISOString().slice(0, 10);

export default function AdminDashboardPage() {
  const reservasHoy = RESERVACIONES.filter((r) => r.fecha === hoyISO);
  const ocupadas = MESAS.filter((m) => m.estado === "Ocupada");
  const disponibles = MESAS.filter((m) => m.estado === "Disponible");
  const ventasHoy = VENTAS_SEMANA[VENTAS_SEMANA.length - 2].ventas;
  const evento = eventoDeHoy();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-white">Buen día, Admin</h1>
          <p className="text-sm text-white/40">Resumen de actividad de hoy en Bistró Mecha.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Reservaciones hoy" value={String(reservasHoy.length)} icon={CalendarCheck} tone="gold" trend="+12%" />
        <StatCard label="Clientes hoy" value="86" icon={Users} trend="+6%" />
        <StatCard label="Mesas ocupadas" value={`${ocupadas.length}/${MESAS.length}`} icon={LayoutGrid} tone="wine" />
        <StatCard label="Mesas disponibles" value={String(disponibles.length)} icon={CircleDot} tone="forest" />
        <StatCard label="Ventas del día" value={formatCurrency(ventasHoy)} icon={DollarSign} tone="gold" trend="+18%" />
        <StatCard label="Pedidos activos" value="7" icon={ClipboardList} />
        <StatCard
          label="Evento de hoy"
          value={evento ? evento.nombre : "Sin evento"}
          icon={Music2}
          tone="wine"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-[#12141B] p-5 lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-white">Ventas por día (semana actual)</p>
          <BarChart data={VENTAS_SEMANA} valueKey="ventas" labelKey="dia" currency />
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#12141B] p-5">
          <p className="mb-4 text-sm font-semibold text-white">Platillos más vendidos</p>
          <HorizontalBarChart data={PLATILLOS_MAS_VENDIDOS} valueKey="cantidad" labelKey="nombre" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-[#12141B] p-5 lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-white">Reservaciones por día</p>
          <LineChart data={VENTAS_SEMANA} valueKey="reservaciones" labelKey="dia" color="#C6A15B" />
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#12141B] p-5">
          <p className="mb-4 text-sm font-semibold text-white">Ocupación por horario</p>
          <HorizontalBarChart data={OCUPACION_HORARIO} valueKey="ocupacion" labelKey="hora" color="#1F2E26" />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/5 bg-[#12141B] p-5">
        <p className="mb-4 text-sm font-semibold text-white">Próximas reservaciones</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-white/30">
                <th className="pb-3 font-medium">Cliente</th>
                <th className="pb-3 font-medium">Hora</th>
                <th className="pb-3 font-medium">Personas</th>
                <th className="pb-3 font-medium">Zona</th>
                <th className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {RESERVACIONES.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 font-medium text-white">{r.nombre}</td>
                  <td className="py-3 text-white/60">{r.fecha} · {r.hora}</td>
                  <td className="py-3 text-white/60">{r.personas}</td>
                  <td className="py-3 text-white/60">{r.zona}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70">{r.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
