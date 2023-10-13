import { BlurbRequest, PLATFORM } from "@/types";
import { PromptTemplate } from "langchain/prompts";

export async function getPrompt(platformName: PLATFORM, blurbRequest: BlurbRequest) {
  return await new PromptTemplate({
    template: GENERAL_TEMPLATE + getPlatformSpecificPrompt(platformName, blurbRequest.includeEmojis, blurbRequest.includeHashtags),
    inputVariables: [
    "platformName",
    "brandName",
    "theme",
    "description",
    "links",
    "targetAudience",
  ],
  }).format({platformName, ...blurbRequest})
}


export async function getRegeneratePrompt(platformName: PLATFORM, oldBlurb: string, action: string) {
  return await new PromptTemplate({
    template: regenerateTemplate + PLATFORM_SPECIFIC_PROMPT[platformName],
    inputVariables: [
    "platformName",
    "oldBlurb",
    "action"
  ],
  }).format({platformName, oldBlurb, action})
}
const regenerateTemplate = "Here is an marketing blurb on {platformName}, make it more {action}. \n {oldBlurb} \n";

const getPlatformSpecificPrompt = (platform:PLATFORM, includeEmojis: boolean, includeHashtags: boolean) => {
  const emojiAndHashtagPrompt = getEmojiAndHashtagCountPrompt(includeEmojis, includeHashtags, platform);
  const lengthPrompt = getLengthPrompt(platform);
  const platformSpecificPrompt = PLATFORM_SPECIFIC_PROMPT[platform];

  return emojiAndHashtagPrompt + platformSpecificPrompt + lengthPrompt;
}


const getEmojiAndHashtagCountPrompt = (wantEmoji: boolean, wantHashtag: boolean, platformName: PLATFORM) => {
  if (!wantEmoji && !wantEmoji) return "";

  let prompt = "- Please ";
  if (wantEmoji) prompt += `include ${EMOJI_COUNT_RANGE[platformName]} emojis`;
  if (wantEmoji && wantHashtag) prompt += ' and ';
  if (wantHashtag) prompt += `generate ${HASHTAG_COUNT_RANGE[platformName]} hashtags at the end`;
  prompt += ".\n"

  return prompt;
}

const getLengthPrompt = (platform: PLATFORM) => {
  return (platform === PLATFORM.Twitter) 
  ? `- Each part should not exceed 280 characters. \n`
  :`- The length should ${LENGTH_RANGE[platform]} words.\n`
}

const GENERAL_TEMPLATE = 
"Hello GPT, I need you to act as a content creator (podcaster or newsletter writer) who wants to market their content on {platformName}.\n" + 
"Let’s take a deep breath and now I will give you the key information of my content.\n" +
"Podcast/Newsletter Name:{brandName}\n" +
"The theme of this issue/episode:{theme}\n" +
"Description: {description}\n" +
"CTA: {links}\n" + 
"Target Audience: {targetAudience}\n" + 
"Above is the context of my content. Here are some additional requirements for the marketing blurb. \n"

const PLATFORM_SPECIFIC_PROMPT: {[key in PLATFORM]: string} = {
  [PLATFORM.LinkedIn]: 
  "- Use bullet points to summarize the topics.\n"+ 
  "- Make the first sentence very catchy.\n"+
  "- Make the tone sound professional.\n",

  [PLATFORM.Instagram]:
  "- Use bullet points to summarize the topics.\n"+
  "- Make it sound catchy and a bit humorous\n"+
  "- Start with a short title alert\n",

  [PLATFORM.Twitter]:
  "- Use bullet points to summarize the topics.\n" +
  "- Make it sound catchy.\n" +
  "- Start with a short title alert.\n" +
  "- Separate the outcome of each part with a dividing line.\n",

  [PLATFORM.TikTok]: 
  "- Make it sound catchy.\n",
}

const EMOJI_COUNT_RANGE = {
  [PLATFORM.LinkedIn] : "5-10",
  [PLATFORM.Instagram] : "5-10",
  [PLATFORM.TikTok] : "1-3",
  [PLATFORM.Twitter] : "2-5",
}

const HASHTAG_COUNT_RANGE = {
  [PLATFORM.LinkedIn] : "10",
  [PLATFORM.Instagram] : "10",
  [PLATFORM.TikTok] : "10",
  [PLATFORM.Twitter] : "10",
}

const LENGTH_RANGE = {
  [PLATFORM.LinkedIn] : "around 250",
  [PLATFORM.Instagram] : "around 200",
  [PLATFORM.TikTok] : "at most 20",
  [PLATFORM.Twitter] : "",
}