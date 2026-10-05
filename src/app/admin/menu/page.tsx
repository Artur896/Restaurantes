"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PLATILLOS, formatCurrency } from "@/lib/demo-data";
import type { CategoriaMenu, Platillo } from "@/lib/types";
import { Modal } from "@/components/admin/Modal";

const categorias: CategoriaMenu[] = [
  "Desayunos", "Entradas", "Ensaladas", "Pastas", "Pizzas", "Platos fuertes", "Postres", "Café", "Cócteles", "Vinos", "Bebidas",
];

const vacio: Omit<Platillo, "id"> = {
  nombre: "",
  descripcion: "",
  ingredientes: [],
  precio: 0,
  categoria: "Platos fuertes",
  imagen: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
  etiquetas: [],
  disponible: true,
  sucursalIds: ["centro", "primero-mayo"],
};

export default function AdminMenuPage() {
  const [platillos, setPlatillos] = useState<Platillo[]>(PLATILLOS);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState<Platillo | null>(null);
  const [form, setForm] = useState(vacio);

  function abrirNuevo() {
    setEditando(null);
    setForm(vacio);
    setModal(true);
  }
  function abrirEditar(p: Platillo) {
    setEditando(p);
    setForm(p);
    setModal(true);
  }
  function guardar() {
    if (editando) {
      setPlatillos((ps) => ps.map((p) => (p.id === editando.id ? { ...editando, ...form } : p)));
    } else {
      setPlatillos((ps) => [...ps, { ...form, id: `p${Date.now()}` }]);
    }
    setModal(false);
  }
  function eliminar(id: string) {
    setPlatillos((ps) => ps.filter((p) => p.id !== id));
  }
  function toggleDisponible(id: string) {
    setPlatillos((ps) => ps.map((p) => (p.id === id ? { ...p, disponible: !p.disponible } : p)));
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-white">Menú</h1>
          <p className="text-sm text-white/40">{platillos.length} platillos · gestiona precios, fotos y disponibilidad.</p>
        </div>
        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-carbon"
        >
          <Plus size={16} /> Agregar platillo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {platillos.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-white/5 bg-[#12141B]">
            <div className="relative aspect-[4/3]">
              <Image src={p.imagen} alt={p.nombre} fill className="object-cover" sizes="250px" />
            </div>
            <div className="p-3.5">
              <p className="truncate text-sm font-semibold text-white">{p.nombre}</p>
              <p className="text-xs text-white/40">{p.categoria}</p>
              <p className="mt-1 text-sm font-semibold text-gold">{formatCurrency(p.precio)}</p>
              <div className="mt-3 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <span
                    onClick={() => toggleDisponible(p.id)}
                    className={`relative h-5 w-9 rounded-full transition ${p.disponible ? "bg-emerald-600" : "bg-white/10"}`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                        p.disponible ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </span>
                  <span className="text-[11px] text-white/50">{p.disponible ? "Disponible" : "Agotado"}</span>
                </label>
                <div className="flex gap-1">
                  <button onClick={() => abrirEditar(p)} className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-white">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => eliminar(p.id)} className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-rose-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editando ? "Editar platillo" : "Agregar platillo"} wide>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nombre">
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="input" />
          </Field>
          <Field label="Precio">
            <input
              type="number"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
              className="input"
            />
          </Field>
          <Field label="Categoría">
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value as CategoriaMenu })}
              className="input"
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Imagen (URL)">
            <input value={form.imagen} onChange={(e) => setForm({ ...form, imagen: e.target.value })} className="input" />
          </Field>
          <Field label="Descripción" full>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              rows={2}
              className="input"
            />
          </Field>
          <Field label="Ingredientes (separados por coma)" full>
            <input
              value={form.ingredientes.join(", ")}
              onChange={(e) => setForm({ ...form, ingredientes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              className="input"
            />
          </Field>
        </div>
        <button onClick={guardar} className="mt-5 w-full rounded-lg bg-gold py-3 text-sm font-semibold text-carbon">
          {editando ? "Guardar cambios" : "Publicar platillo"}
        </button>
      </Modal>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #0b0d12;
          padding: 0.6rem 0.8rem;
          font-size: 0.875rem;
          color: white;
        }
        .input:focus {
          outline: none;
          border-color: #c6a15b;
        }
      `}</style>
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
