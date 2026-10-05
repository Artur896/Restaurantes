import { NextResponse } from "next/server";
import { EVENTOS } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ data: EVENTOS });
}
