import { BlurbRequest } from "@/types";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.array(
    z.object({
      platform: z
        .string()
        .describe(
          "The platform name of the blurb. One of TikTok, Instagram, LinkedIn, Tweeter."
        ),
      blurbs: z
        .array(
          z
            .string()
            .describe(
              "A caption or a maketing blurb based on the information provided in the request."
            )
        )
        .length(4),
    })
  )
);

async function getPrompt(blurbRequest: BlurbRequest) {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      "Analyze the following request. Write 4 marketing blurbs for each of the following platforms: {platforms}. Blurbs for each platforms should have differnet length, tone depends on the platform. \nBrand Name:{brandName}\nTheme:{theme}\nDescription: {description}\nLinks: {links}\nTarget Audience: {targetAudience}\nIncude Emojis: {includeEmojis}\nInclude HashTags:{includeHashtags}\nFollow the instructions and format your response to match the format instructions, no matter what!!!\n{format_instructions}",
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
    partialVariables: { format_instructions },
  });
  const input = await prompt.format({ ...blurbRequest });
  return input;
}

export async function generate(blurbRequest: BlurbRequest) {
  const prompt = await getPrompt(blurbRequest);
  const model = new OpenAI({ temperature: 0.5, modelName: "gpt-3.5-turbo" });
  const result = await model.call(prompt);

  try {
    return parser.parse(result);
  } catch (error) {
    console.error(error);
  }
}
