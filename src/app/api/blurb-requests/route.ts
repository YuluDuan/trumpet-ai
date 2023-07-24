import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Blurb, Platform } from "@prisma/client";
import { generateBlurb } from "@/app/api/generate-blurb/route";
export async function POST(req: Request) {

  // Extract the context from the body of the request
  const { platforms, blurbRequest: context } = await req.json();

  // validate body
  if (!platforms || !context) {
    return new NextResponse('invalid blurb request', { status: 400 });
  }

  const { brandName, theme, description, links, targetAudience, includeEmojis, includeHashtags } = context;

  // Generate blurbs and write requests to db (in parallel)
  const blurbGenerationPromises = platforms.map(async (platformId: number) => {
    const { id: requestId, platform } = await db.blurbRequest.create({
      data: {
        brandName,
        theme,
        description,
        links,
        targetAudience,
        includeEmojis,
        includeHashtags,
        platform: {
          connect: { id: platformId }
        }
      },
      include: {
        platform: true
      }
    });

    const blurbContent = await generateBlurb(platform.name, context);
    const { content } = await db.blurb.create({
      data: {
        content: blurbContent,
        request: {
          connect: { id: requestId }
        }
      },
    });

    return {
      requestId,
      platformId,
      content
    };
  });

  const blurbList = await Promise.all(blurbGenerationPromises);

  return new NextResponse(JSON.stringify(blurbList));
}