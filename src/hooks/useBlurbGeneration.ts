import { RootState } from "@/store";
import { addNewBlurbVariant } from "@/store/blurbsSlice";
import { BlurbRequest, BlurbRequestFull, PLATFORM } from "@/types";
import { UseCompletionHelpers, useCompletion } from "ai/react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/provider";
import { useEffect, useRef } from "react";

export function useBlurbGeneration() {
  const dispatch = useAppDispatch();

  const blurbRequestId = useSelector((state: RootState) => state.blurbRequest.blurbRequest?.id);
  const blurbRequestIdRef = useRef<string | undefined>(blurbRequestId);
  useEffect(() => {
    blurbRequestIdRef.current = blurbRequestId;
  }, [blurbRequestId]);

  const platformGenerationMap: Map<PLATFORM, UseCompletionHelpers> = new Map();

  const InstagramHelper = useCompletion({
    api: `/api/completion/${PLATFORM.Instagram}`,
    onFinish(prompt, completion) {
      onFinishPlatform(PLATFORM.Instagram, completion);
    },
  });

  const LinkedInHelper= useCompletion({
    api: `/api/completion/${PLATFORM.LinkedIn}`,
    onFinish(prompt, completion) {
      onFinishPlatform(PLATFORM.LinkedIn, completion);
    },
  });

  const TikTokHelper= useCompletion({
    api: `/api/completion/${PLATFORM.TikTok}`,
    onFinish(prompt, completion) {
      onFinishPlatform(PLATFORM.TikTok, completion);
    },
  });

  const TwitterHelper= useCompletion({
    api: `/api/completion/${PLATFORM.Twitter}`,
    onFinish(prompt, completion) {
        onFinishPlatform(PLATFORM.Twitter, completion);
    },
  });

  platformGenerationMap.set(PLATFORM.Instagram, InstagramHelper);
  platformGenerationMap.set(PLATFORM.LinkedIn, LinkedInHelper);
  platformGenerationMap.set(PLATFORM.TikTok, TikTokHelper);
  platformGenerationMap.set(PLATFORM.Twitter, TwitterHelper);

  function onFinishPlatform(platformName: PLATFORM, completion:string) {
    if (!blurbRequestIdRef.current) return;
    const blurbVariant = {platformName, content: completion, blurbRequestId: blurbRequestIdRef.current};
    dispatch(addNewBlurbVariant(blurbVariant));
  }

  async function generate(plaftformNames: PLATFORM[], blurbRequest: BlurbRequest) {
    plaftformNames.forEach(async (platformName) => {
      platformGenerationMap.get(platformName)?.complete("", { body: { blurbRequest, platformName}})
    })
  }

  async function regenerate(platformName: PLATFORM, oldBlurb: string, action: string) {
    platformGenerationMap.get(platformName)?.complete(`make ${oldBlurb} more ${action}}`, { body: { platformName, oldBlurb, action, isRegeneration: true}})
  }

  return {
    generate,
    regenerate,
    platformGenerationMap
  }
}
