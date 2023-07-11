"use client";
import { BlurbContext, BlurbContextWithPlatform, Platform } from "@/types";
import { createContext, useContext } from "react";

const emptyContext: BlurbContext = {
  brandName: "",
  theme: "",
  description: "",
  links: "",
  targetAudience: "",
  emoji: true,
  hashtags: true,
}

export type GenerateBlurbContext = Record<Platform, BlurbContextWithPlatform>;
export const defaultGenerateBlurbContext: GenerateBlurbContext = {
  [Platform.Instagram]: {...emptyContext, platform: Platform.Instagram},
  [Platform.LinkedIn]: {...emptyContext, platform: Platform.LinkedIn},
  [Platform.Twitter]: {...emptyContext, platform: Platform.Twitter},
  [Platform.TikTok]: {...emptyContext, platform: Platform.TikTok}
};
export const GenerateBlurbContext = createContext<GenerateBlurbContext>(defaultGenerateBlurbContext);

export function useGenerateBlurbContext() {
  return useContext(GenerateBlurbContext);
}