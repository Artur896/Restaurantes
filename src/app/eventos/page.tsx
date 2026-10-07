import { EVENTOS, eventoDeHoy } from "@/lib/demo-data";
import { EventHero } from "@/components/EventCard";
import { EventFullCard } from "@/components/EventFullCard";

export default function EventosPage() {
  const hoy = eventoDeHoy();
  const resto = EVENTOS.filter((e) => e.id !== hoy?.id && e.estado !== "Borrador");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Agenda en vivo</p>
      <h1 className="mt-1 font-serif text-4xl text-graphite">Eventos en Bistró Mecha</h1>
      <p className="mt-2 max-w-lg text-sm text-graphite/50">
        Música en vivo, brunch de fin de semana y noches especiales. Reserva tu mesa y vive la experiencia completa.
      </p>

      {hoy && (
        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold text-champagne">Hoy</p>
          <EventHero evento={hoy} />
        </div>
      )}

      <div className="mt-10">
        <p className="mb-4 text-sm font-semibold text-graphite/55">Próximos eventos</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {resto.map((e) => (
            <EventFullCard key={e.id} evento={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
