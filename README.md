# Bistró Mecha — Plataforma Digital de Experiencia (Prototipo)

> **Aviso importante.** Este repositorio es un **prototipo/pitch no oficial**, desarrollado como
> propuesta tecnológica para presentarle a **Bistró Mecha** (bistromecha.com.mx), restaurante real
> en Toluca, Estado de México. **Aún no existe un acuerdo formal con el negocio.** Dirección,
> teléfonos, WhatsApp, Instagram y algunos nombres/descripciones de platillos destacados se
> tomaron de su sitio público para que el pitch se sienta real; precios de menú, fotografías
> (stock de Unsplash como placeholder) y el logotipo siguen siendo **demostrativos**. Antes de
> cualquier uso comercial o público real, todo debe validarse y autorizarse directamente con el
> establecimiento.

## Qué es esto

Una experiencia web tipo app móvil/PWA para un restaurante premium que combina:

- Reservaciones con disponibilidad por horario y flujo especial para eventos en vivo.
- Menú digital por categorías con filtros, favoritos y fichas de platillo.
- Modo **"Mi mesa"** (activado vía QR): pedir, ver cuenta, dividir cuenta, solicitar mesero.
- Agenda de eventos y música en vivo ("Hoy en Bistró Mecha").
- Perfil de cliente con historial y favoritos.
- Panel administrativo `/admin` tipo SaaS: dashboard con gráficas, calendario de
  reservaciones, mapa visual de mesas, CRUD de menú y eventos, pedidos, cuentas, clientes,
  notificaciones y configuración (sucursales, roles, QR por mesa).

## Stack

- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + Framer Motion + lucide-react.
- **PWA:** `public/manifest.json` + `public/sw.js` (service worker con cache-first de respaldo),
  instalable en celular.
- **Backend/DB (fase siguiente):** esquema Prisma para PostgreSQL en `prisma/schema.prisma`,
  stubs de API en `src/app/api/*` y esqueleto de sesiones firmadas en `src/lib/auth.ts`.

## Estado actual: interfaz primero, backend después

Siguiendo el encargo original, **esta entrega prioriza la interfaz completa con datos demo**
(`src/lib/demo-data.ts`), usando estado local de React + `localStorage` para simular el
carrito de la mesa, favoritos y solicitudes de ayuda. Nada de esto persiste en un servidor
todavía. Los stubs en `src/app/api` y el esquema en `prisma/schema.prisma` son el punto de
partida documentado para conectar una base de datos real.

### Limitaciones conocidas de este prototipo

- `/admin` **no tiene todavía una pantalla de login ni middleware que bloquee el acceso** —
  `src/lib/auth.ts` ya incluye el esqueleto de firma/verificación de sesión (HMAC) y una
  jerarquía de roles (`Administrador > Gerente > Mesero > Cocina > Cliente`), pero falta
  conectarlo a un formulario de login y a `middleware.ts` para proteger las rutas. Es el primer
  punto a resolver antes de exponer este panel fuera de un entorno de demostración.
- Los cambios hechos en el panel admin (CRUD de menú/eventos, estados de mesas, pedidos) viven
  solo en el estado de React de cada página: se pierden al recargar. Persistirlos requiere
  conectar los endpoints en `src/app/api` a Prisma/PostgreSQL.
- No hay WebSockets todavía: las notificaciones del admin son datos demo
  (`src/lib/demo-data.ts#NOTIFICACIONES`), no eventos en vivo.
- Los íconos de PWA (`public/icons/*.svg`) son un monograma genérico "BM" de marcador de
  posición; deben sustituirse por el set de íconos oficial (PNG en varias resoluciones) cuando
  exista identidad de marca autorizada.

## Siguientes pasos sugeridos (backend y base de datos)

1. **Base de datos:** levantar PostgreSQL, configurar `DATABASE_URL` (ver `.env.example`) y
   correr `npx prisma migrate dev` sobre `prisma/schema.prisma`.
2. **Autenticación real:** construir `/admin/login`, emitir la cookie httpOnly con
   `firmarSesion()` (`src/lib/auth.ts`) y agregar `middleware.ts` que llame a
   `verificarSesion()` y exija `tienePermiso(rol, "Mesero")` (o el mínimo que corresponda) antes
   de servir cualquier ruta bajo `/admin`.
3. **Migrar los endpoints demo a Prisma:** reemplazar los arreglos en memoria de
   `src/app/api/*/route.ts` por consultas reales, y mover la lógica de
   `src/lib/demo-data.ts` a seeds de base de datos.
4. **Tiempo real:** agregar un canal de WebSockets (o Server-Sent Events) para que
   "Solicitar mesero", nuevos pedidos y nuevas reservaciones empujen notificaciones al panel
   admin sin recargar.
5. **Multisucursal:** el esquema ya modela `Sucursal` como entidad raíz de mesas, menú,
   eventos y usuarios; falta exponer el selector de sucursal en la app pública y filtrar todas
   las consultas por `sucursalId`.
6. **QR de mesa:** cada `Mesa` en el esquema tiene `qrToken` único; el endpoint que resuelva
   `/mesa/[id]` deberá validar ese token en vez de confiar solo en el id visible en la URL.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` para la experiencia de cliente y
`http://localhost:3000/admin` para el panel administrativo.

```bash
npm run build && npm run start   # build de producción
npx tsc --noEmit                  # chequeo de tipos
```

## Estructura relevante

```
src/
  app/                  rutas (App Router): inicio, menú, reservar, eventos, mesa, cuenta,
                         contacto y /admin/*
  components/           UI de cliente (DishCard, EventCard, HelpFab, BottomSheet…) y de
                         admin (AdminShell, StatCard, charts, Modal)
  lib/
    types.ts            tipos de dominio compartidos
    demo-data.ts         datos ficticios (sucursales, menú, eventos, mesas, reservas…)
    store.tsx            estado de cliente (carrito de mesa, favoritos) con localStorage
    auth.ts              esqueleto de sesiones firmadas + jerarquía de roles
  app/api/              stubs de API (menú, eventos, mesas, reservaciones)
prisma/schema.prisma    modelo de datos propuesto para PostgreSQL
public/manifest.json    manifest PWA
public/sw.js            service worker
```
