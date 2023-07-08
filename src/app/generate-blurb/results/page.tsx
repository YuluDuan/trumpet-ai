import { OpenAIStream } from 'ai'
import { Suspense } from 'react'
import { openai } from "@/lib/openai";

export default async function Page({
                                     searchParams
                                   }: {
  // note that using searchParams opts your page into dynamic rendering. See https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  searchParams: Record<string, string>
}) {
  const promptTemplate = ({brandName = "P@CMU's podcast - The breakdown | Product and Entrepreneurship", theme ="how to make the most of your summer internship ", description = "Setting expectations for the internship, How to network during the internship", links="", platform='linkedIn', withEmoji=true, withHashTags=true}) => {
    const template =  `
    Write a ${platform} post to promote ${brandName}.
    Here are the key information:
    Theme: ${theme}, 
    Description: ${description}, 
    CTA links: ${links}, 
    ${withEmoji ? 'including emojis' : 'no emojis'},
    ${withHashTags ? 'including hashtags' : 'no hash tags'}
  `;
    console.log(template);
    return template;
    // return template.split(/\r?\n/g);
  }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: promptTemplate({})
          // searchParams['prompt'] ?? 'Give me code for generating a JSX button'
      }
    ]
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  const reader = stream.getReader()

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