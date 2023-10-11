import { RootState } from "@/store";
import { addNewBlurbVariant, blurbsActions} from "@/store/blurbsSlice";
import { BlurbRequest, PLATFORM } from "@/types";
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

  Object.values(PLATFORM).forEach(platform => {
    const helper = useCompletion({
      api: `/api/completion/${platform}`,
      onFinish(prompt, completion) {
        onFinishPlatform(platform, completion);
      },
    });
    platformGenerationMap.set(platform, helper);
  });

  function onFinishPlatform(platformName: PLATFORM, completion: string) {
    if (!blurbRequestIdRef.current) return;
    const blurbVariant = { platformName, content: completion, blurbRequestId: blurbRequestIdRef.current };
    dispatch(addNewBlurbVariant(blurbVariant));
  }

  async function generate(platformNames: PLATFORM[], blurbRequest: BlurbRequest) {
    platformNames.forEach(platformName => {
      dispatch(blurbsActions.generateMainBlurb(platformName));
      platformGenerationMap.get(platformName)?.complete("", { body: { blurbRequest, platformName } })
    });
  }

  async function regenerate(platformName: PLATFORM, oldBlurb: string, action: string) {
    platformGenerationMap.get(platformName)?.complete(`make ${oldBlurb} more ${action}}`, { body: { platformName, oldBlurb, action, isRegeneration: true } })
  }

  return {
    generate,
    regenerate,
    platformGenerationMap
  }
}
