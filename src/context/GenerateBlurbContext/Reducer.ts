'use client'
import { GenerateBlurbAction } from "@/context/GenerateBlurbContext/Actions";
import { GenerateBlurbContext } from "@/context/GenerateBlurbContext/Context";

export const generateBlurbContextReducer = (state: GenerateBlurbContext, action: GenerateBlurbAction): GenerateBlurbContext => {
  switch (action.type) {
    case "GENERATE_INITIAL": {
      console.info('generating initial blurbs');
      const { platforms, context } = action.payload;
      return platforms.reduce(
        (generateBlurbContext, platform) => {
          generateBlurbContext[platform] = { ...context, platform };
          return generateBlurbContext;
        },
        {} as GenerateBlurbContext
      );
    }
    default:
      return state;
  }
};
