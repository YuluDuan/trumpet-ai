import { BlurbRequest, blurbRequestSchema } from "@/types";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { Configuration, OpenAIApi } from "openai-edge";
import { Prisma } from ".prisma/client";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
})
const openai = new OpenAIApi(apiConfig)

export async function generateBlurbVariantsForPlatforms(blurbRequest: BlurbRequest, platformIds: string[]) {
  const newBlurbRequest = await saveBlurbRequest(blurbRequest, platformIds);
  if (!newBlurbRequest) throw new Error('failed to save blurb request');

  const variantPromises = platformIds.map(async (platformId) => {
    const variant = await generateVariant(blurbRequest, platformId);
    const newVariant = await saveBlurbVariant(variant, platformId, newBlurbRequest.id);
    return newVariant;
  });

  const variants = await Promise.all(variantPromises);
  return variants;
}
async function saveBlurbRequest(blurbRequest:BlurbRequest, platformIds: string[]) {
  try {
    blurbRequestSchema.parse(blurbRequest);

    const newBlurbRequest = await prisma.blurbRequest.create({
      data: {
       ...blurbRequest,
      }
    });

    return newBlurbRequest;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error);
      throw new Error("Invalid blurb request: " + error.message);
    } else if (error instanceof PrismaClientKnownRequestError){
      console.error(error);
      if (error.code === 'P2025') {
        throw new Error ('Platform not found' + error.message);
      }
    } else {
      throw Error;
    }
  }
}

async function generateVariant(blurbRequest: BlurbRequest, platformId: string) {
  const platform = await prisma.platform.findUnique({where: {name: platformId}});
  if (!platform) throw new Error(`Platform ${platformId} not found`);

  const prompt = composePrompt(platform.name, blurbRequest);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
      {
        role: 'system',
        content: prompt
      }
    ]
  })
  const {choices} = await response.json();
  const generatedBlurb = choices[0].message.content;
  return generatedBlurb;
}

async function saveBlurbVariant(content: string, platformId: string, blurbRequestId: string) {
  const variant = await prisma.blurbVariant.create({
    data: {
      content: content,
      platform: { connect: { name: platformId } },
      BlurbRequest: { connect: { id: blurbRequestId } },
    }
  })
  return variant;
}

function composePrompt(platformName: string, blurbRequest: BlurbRequest) {
  const {brandName, theme, description, links, includeHashtags, targetAudience, includeEmojis} = blurbRequest;
  return `
    Write a post on this platform: ${platformName} to promote ${brandName}.
    Here are the key information:
    Theme: ${theme}, 
    Description: ${description}, 
    CTA links: ${links}, 
    ${includeEmojis ? 'including emojis' : 'no emojis'},
    ${includeHashtags ? 'including hashtags' : 'no hash tags'}.
  `;
}