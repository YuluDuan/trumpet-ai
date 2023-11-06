import { prisma } from "@/lib/db";
import { blurbRequestNoPlatformsDTOSchema } from "@/types";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
  const body = await req.json();

  const blurbRequestNoPlatformDTO = await blurbRequestNoPlatformsDTOSchema.parseAsync(body);
  
  const blurbRequestNew = await prisma.blurbRequest.create({
    data: blurbRequestNoPlatformDTO,
  });

  console.log('\x1b[32m%s\x1b[0m', `blurb request created: id: ${blurbRequestNew.id}`)

  return new NextResponse(JSON.stringify(blurbRequestNew));
} catch (error) {
  if (error instanceof ZodError) return new NextResponse("Invalid Body", {status: 400})

  return new NextResponse("Internal server error", { status: 500 });
}
}