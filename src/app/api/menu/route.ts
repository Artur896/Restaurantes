import { NextResponse } from "next/server";
import { PLATILLOS } from "@/lib/demo-data";

// Stub de API: hoy sirve los datos demo en memoria. En la siguiente fase este
// endpoint consultará Prisma (modelo Platillo) filtrando por sucursal y disponibilidad.
export async function GET() {
  return NextResponse.json({ data: PLATILLOS });
}
