import Instagram from "../../public/assets/ins.svg";
import LinkedIn from "../../public/assets/linkedin.svg";
import Twitter from "../../public/assets/twitter.svg";
import Tiktok from "../../public/assets/tiktok.png";
import { StaticImageData } from "next/image";

export function swapToFirst<T>(arr: T[], index: number | undefined): T[] {
  if (!index) return arr;
  if (index < 0 || index >= arr.length) {
      throw new Error('Index out of bounds');
  }

  // Create a copy of the array
  const newArr = [...arr];  

  const [item] = newArr.splice(index, 1);
  newArr.unshift(item);

  return newArr;
}

export const PLATFORM_IMAGE :  { [key: string]: StaticImageData } = {
    "LinkedIn": LinkedIn,
    "Instagram": Instagram,
    "Twitter": Twitter,
    "Tiktok": Tiktok,
}

export const imageMatch = (platform: string, images: { [key: string]: StaticImageData }) : StaticImageData => {
    return images[platform] || Tiktok;
};

type DropdownOptions = {
    [key: string]: (string | { subLabel: string; items: string[] })[];
}
export function cardDropdownOptions(isVariantCard: boolean): DropdownOptions{
    if (isVariantCard) {
        return  {
            Regenerate: ["Expand", "Shorten", "Rewrite"],
            Tone: [
              "Professional",
              "Relaxed",
              "Catchy",
              "Humorous",
              "Enthusiastic",
              "Brief",
            ],
            "Update Emoji": [
              "More Emojis",
              "Less Emojis",
              {
                subLabel: "Change Vibe",
                items: ["Catchy", "Calm", "Emotional"],
              },
            ],
          };
    }else{
        return {
            Variants: ["1", "2", "3"],
            Regenerate: ["Expand", "Shorten", "Rewrite"],
            Tone: [
              "Professional",
              "Relaxed",
              "Catchy",
              "Humorous",
              "Enthusiastic",
              "Brief",
            ],
            "Update Emoji": [
              "More Emojis",
              "Less Emojis",
              {
                subLabel: "Change Vibe",
                items: ["Catchy", "Calm", "Emotional"],
              },
            ],
          };
    }
}
