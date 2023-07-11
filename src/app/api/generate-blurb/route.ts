// app/api/chat/route.ts

import { Configuration, OpenAIApi } from 'openai-edge'
import { BlurbContext, Platform } from "@/types";
import { NextResponse } from "next/server";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
})

const openai = new OpenAIApi(apiConfig)

export async function POST(req: Request) {
  // Extract the context from the body of the request
  const {platforms, blurbContext} = await req.json();

  const getPrompt = (platforms: Platform[], blurbContext: BlurbContext) => {
    const {brandName, theme, description, links, hashtags, targetAudience, emoji} = blurbContext;
    const prompt =  `
    Write one post on each platform: ${platforms.toString()} (total ${platforms.length} posts) to promote ${brandName}.
    Here are the key information:
    Theme: ${theme}, 
    Description: ${description}, 
    CTA links: ${links}, 
    ${emoji ? 'including emojis' : 'no emojis'},
    ${hashtags ? 'including hashtags' : 'no hash tags'}.
    Possible platform names are: INSTAGRAM, LINKED_IN, TIK_TOK, TWITTER.
    The result should be in the form of [platform1 name]:[generated blurb for platform1], [platform2 name]:[generated blurb for platform2]
  `;
    console.log(prompt);
    return prompt;
  }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
      {
        role: 'system',
        content: getPrompt(platforms, blurbContext)
      }
    ]
  })

  const {choices} = await response.json();

  const unprocessedBlurbs = choices[0].message.content;
  const blurbs = parseBlurbs(unprocessedBlurbs);


  return NextResponse.json(blurbs);
}

function parseBlurbs(unprocessedBlurbs:string) {
  const blurbsWithPlatform = unprocessedBlurbs.split('\n\n');
  return blurbsWithPlatform.map(blurbWithPlatform => {
    const [platform, blurb] = blurbWithPlatform.split(': ');
    return { platform, blurb };
  });
}