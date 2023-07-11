import { OpenAIStream } from 'ai'
import { Suspense } from 'react'
import { openai } from "@/lib/openai";
import { GenerateBlurbContext } from "@/context/GenerateBlurbContext/Context";
import { BlurbContext, BlurbContextWithPlatform } from "@/types";

export default async function GeneratedBlurb({blurbContext}:{blurbContext: BlurbContextWithPlatform}) {
  const promptTemplate = (blurbContext: BlurbContextWithPlatform) => {
    const {brandName, theme, description, links, hashtags, targetAudience, emoji, platform} = blurbContext;
    const template =  `
    Write a ${platform} post to promote ${brandName}.
    Here are the key information:
    Theme: ${theme}, 
    Description: ${description}, 
    CTA links: ${links}, 
    ${emoji ? 'including emojis' : 'no emojis'},
    ${hashtags ? 'including hashtags' : 'no hash tags'}
  `;
    console.log(template);
    return template;
  }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: promptTemplate(blurbContext)
      }
    ]
  })

  const messageContent = await response.json()

  // We recursively render the stream as it comes in
  return (
    <Suspense>
      <Reader reader={reader} />
    </Suspense>
  )
}

async function Reader({
                        reader
                      }: {
  reader: ReadableStreamDefaultReader<any>
}) {
  const { done, value } = await reader.read()

  if (done) {
    return null
  }

  const text = new TextDecoder().decode(value)

  return (
    <span>
      {text}
      <Suspense>
        <Reader reader={reader} />
      </Suspense>
    </span>
  )
}