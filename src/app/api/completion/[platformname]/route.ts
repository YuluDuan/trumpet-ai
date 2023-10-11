import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { BlurbRequest, PLATFORM } from "@/types";
import { getPrompt, getRegeneratePrompt } from "@/lib/prompts";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { blurbRequest, platformName, oldBlurb, action, isRegeneration} = await req.json();

  let prompt;
  if (isRegeneration) {
    console.log("regenerating blurb for", platformName);
    prompt = await getRegeneratePrompt(platformName as PLATFORM, oldBlurb, action);
    console.log(prompt);
  } else {
    console.log("generating blurb for", platformName);
    prompt = await getPrompt(platformName as PLATFORM, blurbRequest);
    console.log(prompt);
  }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 1000,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}

