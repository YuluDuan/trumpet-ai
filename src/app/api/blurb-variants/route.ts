import { prisma } from "@/lib/db";
import { blurbRequestNoPlatformsDTOSchema, blurbVariantNewDTOSchema } from "@/types";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
  const body = await req.json();

  const blurbVariant = await blurbVariantNewDTOSchema.parseAsync(body);
  
  const blurbVariantNew= await prisma.blurbVariant.create({
    data: blurbVariant,
  });

  return new NextResponse(JSON.stringify(blurbVariantNew));

} catch (error) {
  if (error instanceof ZodError) return new NextResponse("Invalid Body", {status: 400})

  return new NextResponse("Internal server error", { status: 500 });
}
}