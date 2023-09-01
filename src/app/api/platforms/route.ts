import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const platforms = await prisma.platform.findMany({
      select: {
        name: true,
      },
    });
    return new NextResponse(JSON.stringify(platforms));
  } catch (e) {
    return new NextResponse(null, { status: 500 });
  }
}
