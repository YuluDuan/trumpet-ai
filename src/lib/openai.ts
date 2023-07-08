import { Configuration, OpenAIApi } from 'openai-edge'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
})

export const openai = new OpenAIApi(apiConfig)