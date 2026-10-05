import { NextResponse } from "next/server";
import { MESAS } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ data: MESAS });
}
