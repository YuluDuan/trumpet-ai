// app/api/completion/route.ts

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  getInstagramPrompt,
  getLinkedInPrompt,
  getTikTokPrompt,
  getTwitterPrompt,
} from "@/lib/ai";
import { NextRequest } from "next/server";
import { BlurbRequest } from "@/types";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const platformName = req.nextUrl.searchParams.get("platformName");
  const { blurbRequest } = await req.json();

  console.log("generating blurb for", platformName);

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: await getPromptByPlatformName(platformName, blurbRequest),
      },
    ],
    max_tokens: 200,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}

async function getPromptByPlatformName(
  platformName: string,
  blurbRequest: BlurbRequest
) {
  switch (platformName) {
    case "LinkedIn":
      return await getLinkedInPrompt(blurbRequest);
    case "Instagram":
      return await getInstagramPrompt(blurbRequest);
    case "Twitter":
      return await getTwitterPrompt(blurbRequest);
    case "TikTok":
      return await getTikTokPrompt(blurbRequest);
    default:
      return "";
  }
}
