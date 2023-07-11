'use client'
import { BlurbContext, Platform } from "@/types";

type GenerateInitialBlurbAction = {
  type: 'GENERATE_INITIAL'
  payload: {
    platforms: Platform[],
    context: BlurbContext
  }
}

export type GenerateBlurbAction = GenerateInitialBlurbAction // to add more use | ANOTHER_action