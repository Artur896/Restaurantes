import { createHmac, timingSafeEqual } from "crypto";
import type { Rol } from "./types";

// Esqueleto de autenticación por sesión firmada (JWT-like, HMAC-SHA256).
// Suficiente para prototipar roles y proteger /admin; para producción se recomienda
// migrar a una librería madura (jose/jsonwebtoken) + cookies httpOnly + refresh tokens,
// y respaldar las contraseñas con bcrypt/argon2 sobre el modelo Usuario de Prisma.

export type SesionPayload = {
  sub: string; // id de usuario
  nombre: string;
  rol: Rol;
  sucursalId?: string;
  exp: number; // epoch seconds
};

const SECRET = process.env.JWT_SECRET ?? "bistro-mecha-dev-secret-cambia-esto";

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

export function firmarSesion(payload: Omit<SesionPayload, "exp">, ttlSegundos = 60 * 60 * 8) {
  const full: SesionPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + ttlSegundos };
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify(full));
  const firma = createHmac("sha256", SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${firma}`;
}

export function verificarSesion(token: string): SesionPayload | null {
  const partes = token.split(".");
  if (partes.length !== 3) return null;
  const [header, body, firma] = partes;
  const esperada = createHmac("sha256", SECRET).update(`${header}.${body}`).digest("base64url");

  const a = Buffer.from(firma);
  const b = Buffer.from(esperada);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SesionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

const jerarquia: Record<Rol, number> = {
  Cliente: 0,
  Cocina: 1,
  Mesero: 2,
  Gerente: 3,
  Administrador: 4,
};

export function tienePermiso(rol: Rol, minimo: Rol) {
  return jerarquia[rol] >= jerarquia[minimo];
}
