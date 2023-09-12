import { BlurbRequest } from "@/types";
import { PromptTemplate } from "langchain/prompts";

export async function getLinkedInPrompt(blurbRequest: BlurbRequest) {
  const prompt = new PromptTemplate({
    template:
      "Given the following information. Write a blurb that will be posted on LinkedIn.\nBrand Name:{brandName}\nTheme:{theme}\nDescription: {description}\nLinks: {links}\nTarget Audience: {targetAudience}\nIncude Emojis: {includeEmojis}\nInclude HashTags:{includeHashtags}\nThe result should have minimum of 300 characters and maximum of 500 characters.The result should contain at least these sections: Teasers, Topics, CTA(Call to actions). Teasers should be a short description or/and an engating question. Topics are listed in bullet points. CTA includes links, ask for comments. Absolutely do not include section titles (Teasers, Topics, CTA) in the result.",
    inputVariables: [
      "platforms",
      "brandName",
      "theme",
      "description",
      "links",
      "targetAudience",
      "includeEmojis",
      "includeHashtags",
    ],
  });
  const input = await prompt.format({ ...blurbRequest });
  console.log(input);
  return input;
}

export async function getInstagramPrompt(blurbRequest: BlurbRequest) {
  const prompt = new PromptTemplate({
    template:
      "Given the following information. Write a blurb that will be posted on Instagram.\nBrand Name:{brandName}\nTheme:{theme}\nDescription: {description}\nLinks: {links}\nTarget Audience: {targetAudience}\nIncude Emojis: {includeEmojis}\nInclude HashTags:{includeHashtags}\n",
    inputVariables: [
      "platforms",
      "brandName",
      "theme",
      "description",
      "links",
      "targetAudience",
      "includeEmojis",
      "includeHashtags",
    ],
  });
  const input = await prompt.format({ ...blurbRequest });
  return input;
}

export async function getTikTokPrompt(blurbRequest: BlurbRequest) {
  const prompt = new PromptTemplate({
    template:
      "Given the following information. Write a blurb that will be posted on TikTok.\nBrand Name:{brandName}\nTheme:{theme}\nDescription: {description}\nLinks: {links}\nTarget Audience: {targetAudience}\nIncude Emojis: {includeEmojis}\nInclude HashTags:{includeHashtags}\n",
    inputVariables: [
      "platforms",
      "brandName",
      "theme",
      "description",
      "links",
      "targetAudience",
      "includeEmojis",
      "includeHashtags",
    ],
  });
  const input = await prompt.format({ ...blurbRequest });
  return input;
}

export async function getTwitterPrompt(blurbRequest: BlurbRequest) {
  const prompt = new PromptTemplate({
    template:
      "Given the following information. Write a blurb that will be posted on Twitter.\nBrand Name:{brandName}\nTheme:{theme}\nDescription: {description}\nLinks: {links}\nTarget Audience: {targetAudience}\nIncude Emojis: {includeEmojis}\nInclude HashTags:{includeHashtags}\n",
    inputVariables: [
      "platforms",
      "brandName",
      "theme",
      "description",
      "links",
      "targetAudience",
      "includeEmojis",
      "includeHashtags",
    ],
  });
  const input = await prompt.format({ ...blurbRequest });
  return input;
}
