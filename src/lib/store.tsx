"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type { ItemCuenta, Platillo } from "./types";
import { MESAS } from "./demo-data";

type HelpRequestType =
  | "Llamar al mesero"
  | "Más agua"
  | "Cubiertos"
  | "Cuenta"
  | "Cambiar mesa"
  | "Otra cosa";

type AppState = {
  mesaId: string | null;
  carrito: ItemCuenta[];
  favoritos: string[];
  cuentaSolicitada: boolean;
  ultimaSolicitud: HelpRequestType | null;
};

type AppContextType = AppState & {
  setMesa: (mesaId: string) => void;
  salirDeMesa: () => void;
  agregarAlCarrito: (platillo: Platillo) => void;
  quitarDelCarrito: (platilloId: string) => void;
  cambiarCantidad: (platilloId: string, delta: number) => void;
  toggleFavorito: (platilloId: string) => void;
  esFavorito: (platilloId: string) => boolean;
  solicitarCuenta: () => void;
  solicitarAyuda: (tipo: HelpRequestType) => void;
  totalCarrito: number;
  itemsCount: number;
  mesaInfo: (typeof MESAS)[number] | undefined;
};

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = "bistro-mecha-state-v1";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    mesaId: null,
    carrito: [],
    favoritos: [],
    cuentaSolicitada: false,
    ultimaSolicitud: null,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, hydrated]);

  const setMesa = useCallback((mesaId: string) => {
    setState((s) => ({ ...s, mesaId }));
  }, []);

  const salirDeMesa = useCallback(() => {
    setState((s) => ({ ...s, mesaId: null, carrito: [], cuentaSolicitada: false }));
  }, []);

  const agregarAlCarrito = useCallback((platillo: Platillo) => {
    setState((s) => {
      const existe = s.carrito.find((i) => i.platilloId === platillo.id);
      if (existe) {
        return {
          ...s,
          carrito: s.carrito.map((i) =>
            i.platilloId === platillo.id ? { ...i, cantidad: i.cantidad + 1 } : i
          ),
        };
      }
      return {
        ...s,
        carrito: [
          ...s.carrito,
          { platilloId: platillo.id, nombre: platillo.nombre, precio: platillo.precio, cantidad: 1 },
        ],
      };
    });
  }, []);

  const quitarDelCarrito = useCallback((platilloId: string) => {
    setState((s) => ({ ...s, carrito: s.carrito.filter((i) => i.platilloId !== platilloId) }));
  }, []);

  const cambiarCantidad = useCallback((platilloId: string, delta: number) => {
    setState((s) => ({
      ...s,
      carrito: s.carrito
        .map((i) => (i.platilloId === platilloId ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter((i) => i.cantidad > 0),
    }));
  }, []);

  const toggleFavorito = useCallback((platilloId: string) => {
    setState((s) => ({
      ...s,
      favoritos: s.favoritos.includes(platilloId)
        ? s.favoritos.filter((id) => id !== platilloId)
        : [...s.favoritos, platilloId],
    }));
  }, []);

  const esFavorito = useCallback((platilloId: string) => state.favoritos.includes(platilloId), [state.favoritos]);

  const solicitarCuenta = useCallback(() => {
    setState((s) => ({ ...s, cuentaSolicitada: true }));
  }, []);

  const solicitarAyuda = useCallback((tipo: HelpRequestType) => {
    setState((s) => ({ ...s, ultimaSolicitud: tipo }));
  }, []);

  const totalCarrito = useMemo(
    () => state.carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [state.carrito]
  );
  const itemsCount = useMemo(() => state.carrito.reduce((acc, i) => acc + i.cantidad, 0), [state.carrito]);
  const mesaInfo = useMemo(() => MESAS.find((m) => m.id === state.mesaId), [state.mesaId]);

  const value: AppContextType = {
    ...state,
    setMesa,
    salirDeMesa,
    agregarAlCarrito,
    quitarDelCarrito,
    cambiarCantidad,
    toggleFavorito,
    esFavorito,
    solicitarCuenta,
    solicitarAyuda,
    totalCarrito,
    itemsCount,
    mesaInfo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de AppProvider");
  return ctx;
}
