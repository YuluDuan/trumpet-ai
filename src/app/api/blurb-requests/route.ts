import { NextResponse } from "next/server";
import { blurbRequestSchema } from "@/types";
import { ZodError } from "zod";
import { generateBlurbVariantsForPlatforms } from "@/lib/blurb-service";

export async function POST(req: Request) {
    const { platformIds, blurbRequest } = await req.json();
    if (!platformIds || !blurbRequest) return new NextResponse("invalid request", {status: 400});
    try {
      blurbRequestSchema.parse(blurbRequest);
      const response = await generateBlurbVariantsForPlatforms(blurbRequest, platformIds);
      return new NextResponse(
        JSON.stringify(response), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return new NextResponse(error.message, {status: 400});
      } else {
        return new NextResponse(JSON.stringify(error), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },});
      }
    }
}