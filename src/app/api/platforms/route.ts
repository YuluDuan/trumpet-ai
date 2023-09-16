import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const platforms = await prisma.platform.findMany({
      select: {
        name: true
      },
    });
    return new NextResponse(JSON.stringify(platforms));
  } catch (e) {
    return new NextResponse(null,{status: 500});
  }
}