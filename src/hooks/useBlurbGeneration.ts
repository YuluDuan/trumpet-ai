import { BlurbRequest, BlurbRequestFull, PLATFORM } from "@/types";
import { UseCompletionHelpers, useCompletion } from "ai/react";

export function useBlurbGeneration() {
  const platformGenerationMap: Map<PLATFORM, UseCompletionHelpers> = new Map();

  const InstagramHelper = useCompletion({
    api: `/api/completion/${PLATFORM.Instagram}`,

  });

  const LinkedInHelper= useCompletion({
    api: `/api/completion/${PLATFORM.LinkedIn}`,
  });

  const TikTokHelper= useCompletion({
    api: `/api/completion/${PLATFORM.TikTok}`,
  });

  const TwitterHelper= useCompletion({
    api: `/api/completion/${PLATFORM.Twitter}`,
  });

  platformGenerationMap.set(PLATFORM.Instagram, InstagramHelper);
  platformGenerationMap.set(PLATFORM.LinkedIn, LinkedInHelper);
  platformGenerationMap.set(PLATFORM.TikTok, TikTokHelper);
  platformGenerationMap.set(PLATFORM.Twitter, TwitterHelper);


  async function generate(plaftformNames: PLATFORM[], blurbRequest: BlurbRequest) {
    plaftformNames.forEach(async (platformName) => {

      platformGenerationMap.get(platformName)?.complete("", { body: { blurbRequest, platformName}})
    })
  }

  return {
    generate,
    platformGenerationMap
  }
}
