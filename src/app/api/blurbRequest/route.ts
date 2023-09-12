import { createURL } from "@/lib/api";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { blurbRequest } = await req.json();

  const {
    brandName,
    description,
    includeEmojis,
    includeHashtags,
    links,
    targetAudience,
    theme,
  } = blurbRequest;

  const blurbRequestNew = await prisma.blurbRequest.create({
    data: {
      brandName,
      description,
      includeEmojis,
      includeHashtags,
      links,
      targetAudience,
      theme,
    },
  });

  console.log("new blurb request created:", blurbRequestNew);

  return new NextResponse(JSON.stringify(blurbRequestNew));

  // const blurbsGroupedByPlatform = await generate(blurbRequest);

  // if (!blurbsGroupedByPlatform) return new NextResponse("", { status: 500 });

  // await prisma.blurbVariant.createMany({
  //   data: getBlurbVariants(blurbsGroupedByPlatform, blurbRequestNew.id),
  // });

  // const variants = await prisma.blurbVariant.findMany({
  //   where: {
  //     blurbRequestId: blurbRequestNew.id,
  //   },
  // });

  // console.log({ variants });

  // return NextResponse.json({ data: variants });

  // const stream = await generateLinkedIn(blurbRequest);
  // return stream;
}

function getBlurbVariants(
  blurbsGroupedByPlatform: any[],
  blurbRequestId: string
) {
  return blurbsGroupedByPlatform.reduce<
    { platformName: string; content: string; blurbRequestId: string }[]
  >((flatList, blurbsWithPlatform) => {
    const blurbsWithPlatformFlat = blurbsWithPlatform.blurbs.map(
      (blurbContent: string) => ({
        blurbRequestId: blurbRequestId,
        platformName: blurbsWithPlatform.platform,
        content: blurbContent,
      })
    );
    return [...flatList, ...blurbsWithPlatformFlat];
  }, []);
}
