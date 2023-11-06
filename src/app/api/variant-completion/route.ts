import { NextRequest, NextResponse } from "next/server";
import { getPrompt } from "@/lib/prompts";
import { prisma } from "@/lib/db";
import { PLATFORM, blurbRequestNoPlatformsDTOSchema, blurbRequestSchema } from "@/types";
import { ZodError, z } from "zod";
import { OpenAI as langchianOpenAi} from "langchain/llms/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const variantCount = z.number().parse(body.variantCount);
    const platformName = z.nativeEnum( PLATFORM ).parse(body.platformName);
    const blurbRequestId = z.string().parse(body.blurbRequestId);

    console.log({platformName, blurbRequestId})

    const blurbRequest = await prisma.blurbRequest.findFirst({where: {id: blurbRequestId}}).then(
      (blurbRequest) => {
        return blurbRequestNoPlatformsDTOSchema.parse(blurbRequest)
      }
    )
    
    const prompt = await getPrompt(platformName, blurbRequest);

    const model = new langchianOpenAi({ temperature: 0.9, modelName: "gpt-3.5-turbo" });

    let variants = [];
    for (let i = 0; i < variantCount; i++) {
      const blurbContent = await model.call(prompt);
      const variant = await prisma.blurbVariant.create(
        {
          data: {
            blurbRequestId,
            content: blurbContent,
            platformName,
          }
        }
      );
      variants.push(variant);
    }

    return NextResponse.json({ data: variants })
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) return new NextResponse("Invalid Body", {status: 400})
    return new NextResponse("Internal server error", { status: 500 });
  }
}

