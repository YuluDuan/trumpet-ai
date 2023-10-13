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
  const actionPrompt =  (action in ACTION_PROMPT) ? ACTION_PROMPT[action] : "";
  const template = REGENERATE_TEMPLATE + actionPrompt + "Only return the revised prompt, nothing else.\n";
  return await new PromptTemplate({
    template,
    inputVariables: [
    "platformName",
    "oldBlurb",
    "action"
  ],
  }).format({platformName, oldBlurb, action})
}
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

const REGENERATE_TEMPLATE = "I need you to act as a content creator and rewrite this blurb on {platformName}: \n {oldBlurb} \n";

const ACTION_PROMPT: {[key: string]: string} = {
  "Expand": "Make it a little bit longer. For example, you can add more details about the speaker or topics. \n",
  "Shorten": "Make it a little bit shorter.\n",
  "Rewrite": "Regenerate one for me!\n",
  "Professional": "The wording looks good!! Let's make it sound more professional.\n",
  "Relaxed": "The wording looks good!! Let's make it sound more relaxed.\n",
  "Catchy": "The wording looks good!! Let's make it sound more catchy.\n",
  "Humorous": "The wording looks good!! Let's make it sound more humorous.\n",
  "Enthusiastic": "The wording looks good!! Let's make it sound more enthusiastic.\n",
  "Brief": "The wording looks good!! Let's make it sound more brief.\n",
  "More Emojis": "Please add more emojis (no more than 10) to this blurb!",
  "Less Emojis": "Please reduce the emojis!",
  "Calm": "Make the emojis more calm (only use basic emoji like an arrow).",
  "Emotional": "Make the emojis emotional (use more face emoji)"
}