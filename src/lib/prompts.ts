import { BlurbRequest, PLATFORM } from "@/types";
import { PromptTemplate } from "langchain/prompts";

export async function getPrompt(platformName: PLATFORM, blurbRequest: BlurbRequest) {
  return await new PromptTemplate({
    template: promptTemplate + platformSpecificPrompt[platformName],
    inputVariables: [
    "platformName",
    "brandName",
    "theme",
    "description",
    "links",
    "targetAudience",
    "includeEmojis",
    "includeHashtags",
  ],
  }).format({platformName, ...blurbRequest})
}

export async function getRegeneratePrompt(platformName: PLATFORM, oldBlurb: string, action: string) {
  return await new PromptTemplate({
    template: regenerateTemplate + platformSpecificPrompt[platformName],
    inputVariables: [
    "platformName",
    "oldBlurb",
    "action"
  ],
  }).format({platformName, oldBlurb, action})
}
const regenerateTemplate = "Here is an marketing blurb {oldBlurb} on {platformName}, make it more {action}"

const promptTemplate = "Given the following information. Write a blurb that will be posted on {platformName}.\nBrand Name:{brandName}\nTheme:{theme}\nDescription: {description}\nLinks: {links}\nTarget Audience: {targetAudience}\nIncude Emojis: {includeEmojis}\nInclude HashTags:{includeHashtags}\n"

const platformSpecificPrompt: {[key in PLATFORM]: string} = {
  [PLATFORM.LinkedIn]: "The result should have minimum of 300 characters and maximum of 500 characters.The result should contain at least these sections: Teasers, Topics, CTA(Call to actions). Teasers should be a short description or/and an engating question. Topics are listed in bullet points. CTA includes links, ask for comments. Absolutely do not include section titles (Teasers, Topics, CTA) in the result.",
  [PLATFORM.TikTok]: "",
  [PLATFORM.Instagram]: "",
  [PLATFORM.Twitter]: ""
}