"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Music2 } from "lucide-react";
import { EVENTOS, SUCURSALES } from "@/lib/demo-data";
import type { Evento, TipoEvento, EstadoEvento } from "@/lib/types";
import { Modal } from "@/components/admin/Modal";
import { Badge } from "@/components/ui/Badge";

const tipos: TipoEvento[] = [
  "Música en vivo", "Jazz", "DJ", "Rock", "Acústico", "Brunch", "Evento especial", "Transmisión deportiva", "Otro",
];

const vacio: Omit<Evento, "id"> = {
  nombre: "",
  fecha: new Date().toISOString().slice(0, 10),
  hora: "20:00",
  horaFin: "23:00",
  descripcion: "",
  artista: "",
  imagen: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&auto=format&fit=crop",
  tipo: "Música en vivo",
  sucursalId: SUCURSALES[0].id,
  capacidad: 60,
  confirmados: 0,
  estado: "Borrador",
};

const estadoTone: Record<EstadoEvento, "gold" | "neutral" | "forest"> = {
  Publicado: "gold",
  Programado: "forest",
  Borrador: "neutral",
};

export default function AdminEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>(EVENTOS);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState<Evento | null>(null);
  const [form, setForm] = useState(vacio);

  function abrirNuevo() {
    setEditando(null);
    setForm(vacio);
    setModal(true);
  }
  function abrirEditar(e: Evento) {
    setEditando(e);
    setForm(e);
    setModal(true);
  }
  function guardar(estado: EstadoEvento) {
    const data = { ...form, estado };
    if (editando) {
      setEventos((es) => es.map((e) => (e.id === editando.id ? { ...editando, ...data } : e)));
    } else {
      setEventos((es) => [...es, { ...data, id: `e${Date.now()}` }]);
    }
    setModal(false);
  }
  function eliminar(id: string) {
    setEventos((es) => es.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-white">Eventos</h1>
          <p className="text-sm text-white/40">Música en vivo, brunch y experiencias especiales.</p>
        </div>
        <button onClick={abrirNuevo} className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-carbon">
          <Plus size={16} /> Crear evento
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eventos.map((e) => (
          <div key={e.id} className="overflow-hidden rounded-2xl border border-white/5 bg-[#12141B]">
            <div className="relative aspect-[16/9]">
              <Image src={e.imagen} alt={e.nombre} fill className="object-cover" sizes="300px" />
              <Badge tone={estadoTone[e.estado]} className="absolute left-3 top-3">
                {e.estado}
              </Badge>
            </div>
            <div className="p-4">
              <p className="flex items-center gap-1.5 text-xs text-white/40">
                <Music2 size={11} /> {e.tipo}
              </p>
              <p className="mt-1 font-serif text-lg text-white">{e.nombre}</p>
              <p className="text-xs text-white/40">
                {e.fecha} · {e.hora}–{e.horaFin} hrs · {e.artista}
              </p>
              <p className="mt-2 text-xs text-white/50">
                {e.confirmados}/{e.capacidad} confirmados · {SUCURSALES.find((s) => s.id === e.sucursalId)?.nombre}
              </p>
              <div className="mt-3 flex justify-end gap-1">
                <button onClick={() => abrirEditar(e)} className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-white">
                  <Pencil size={14} />
                </button>
                <button onClick={() => eliminar(e.id)} className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-rose-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editando ? "Editar evento" : "Crear evento"} wide>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nombre del evento">
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="input" />
          </Field>
          <Field label="Artista / grupo">
            <input value={form.artista} onChange={(e) => setForm({ ...form, artista: e.target.value })} className="input" />
          </Field>
          <Field label="Fecha">
            <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} className="input" />
          </Field>
          <Field label="Tipo de evento">
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoEvento })} className="input">
              {tipos.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Hora inicio">
            <input type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} className="input" />
          </Field>
          <Field label="Hora fin">
            <input type="time" value={form.horaFin} onChange={(e) => setForm({ ...form, horaFin: e.target.value })} className="input" />
          </Field>
          <Field label="Sucursal">
            <select value={form.sucursalId} onChange={(e) => setForm({ ...form, sucursalId: e.target.value })} className="input">
              {SUCURSALES.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </Field>
          <Field label="Capacidad">
            <input
              type="number"
              value={form.capacidad}
              onChange={(e) => setForm({ ...form, capacidad: Number(e.target.value) })}
              className="input"
            />
          </Field>
          <Field label="Imagen (URL)" full>
            <input value={form.imagen} onChange={(e) => setForm({ ...form, imagen: e.target.value })} className="input" />
          </Field>
          <Field label="Descripción" full>
            <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={2} className="input" />
          </Field>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <button onClick={() => guardar("Borrador")} className="rounded-lg border border-white/10 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5">
            Guardar borrador
          </button>
          <button onClick={() => guardar("Programado")} className="rounded-lg border border-white/10 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5">
            Programar
          </button>
          <button onClick={() => guardar("Publicado")} className="rounded-lg bg-gold py-2.5 text-sm font-semibold text-carbon">
            Publicar
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-white/50">{label}</label>
      {children}
    </div>
  );
}
