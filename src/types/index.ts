import React from "react";

export enum Platform {
  Instagram = 'INSTAGRAM',
  LinkedIn = 'LINKED_IN',
  Twitter = 'TWITTER',
  TikTok = 'TIK_TOK'
}

export type BlurbContext = {
  brandName: string;
  theme: string;
  description: string;
  links: string;
  targetAudience: string;
  emoji: boolean;
  hashtags: boolean;
}

export type BlurbContextWithPlatform = BlurbContext & {platform: Platform};

export interface ContextProviderProp {
  children?: React.ReactNode
}
