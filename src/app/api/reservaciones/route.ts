import { NextResponse } from "next/server";
import { RESERVACIONES } from "@/lib/demo-data";

// GET: lista reservaciones demo. POST: valida el payload y devuelve un código de
// confirmación simulado. La versión con base de datos deberá:
//  1. Verificar disponibilidad real de horario/zona en la sucursal (tabla Mesa/Reservacion).
//  2. Crear el registro con Prisma dentro de una transacción.
//  3. Emitir una notificación en tiempo real al panel administrativo (WebSockets).
export async function GET() {
  return NextResponse.json({ data: RESERVACIONES });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.nombre || !body?.telefono || !body?.fecha || !body?.hora) {
    return NextResponse.json(
      { error: "Nombre, teléfono, fecha y hora son obligatorios." },
      { status: 400 }
    );
  }

  const codigo = `BM-${Math.floor(10000 + Math.random() * 89999)}`;

  return NextResponse.json(
    {
      data: {
        ...body,
        id: `demo-${Date.now()}`,
        codigo,
        estado: "Confirmada",
      },
    },
    { status: 201 }
  );
}
