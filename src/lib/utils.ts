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
            "Add Variants": ["1", "2", "3"],
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



type UserCenterDropdownOptions = {
  [key: string]: (string)[];
}
export const USER_CENTER_DROPDOWN:UserCenterDropdownOptions = {
  "Default Vibe" : [
    "Catchy", 
    "Calm", 
    "Emotional",
    "Default Vibe"
  ], 
  
  "Default Quantity": [
    "More Emojis",
    "Less Emojis",
    "Default Quantity"
  ],

  Tone: [
    "Professional",
    "Relaxed",
    "Catchy",
    "Humorous",
    "Enthusiastic",
    "Brief",
  ],

}
type ToneMatch = {
  [key: string]: number;
}
const ToneRule : ToneMatch = {
  "LinkedIn": 0,
  "Instagram": 1,
  "Twitter": 5,
  "TikTok": 2,
}

export const toneMatchHelper =  (platform: string): number => {
  return ToneRule[platform];
}

export type TestimonialContent = {
  width: string;
  height: string;
  avatar: string;
  name: string;
  work_position: string;
  summary: string;
  content: string;
}

export const TestimonialContent: TestimonialContent[] = [
  {
    width: "582px",
    height: "315px",
    avatar: "/assets/testimonial1.jpeg",
    name:"Kristin Watson",
    work_position:"Marketing specialist at AfterShip",
    summary: "Writes better than most of my friends.",
    content: `I just discovered this tool today from the Trends group, and I am
    already blown away. Brilliant tool you guys have made here! I love how
    quick and easy it is to create great copy, and honestly writes way
    better than I ever could. It's like I've employed a full-time
    copywriter for 10% of the cost!`,
},

{
  width: "465px",
  height: "315px",
  avatar: "/assets/testimonial2.png",
  name:"Brooklyn Simmons",
  work_position:"Influencer",
  summary: "Actually freaking good!",
  content: `I'm honestly blown away that it's this good... my first thought was "yeah, sure it's probably gonna be 80% good and need some tweaking..." but then I was like "Damn, this is actually freaking good!"`,
},

{
  width: "465px",
  height: "315px",
  avatar: "/assets/testimonial3.png",
  name:"Ralph Edwards",
  work_position:"sales at Binford Ltd.",
  summary: "This is an Amazing Tool! Highly recommend it!",
  content: `Trumpet.ai is an amazing tool for any and all marketers or anyone looking to write any form of marketing or sales copy. Excited to continue using it and seeing how this further develops.`,
},

{
  width: "582px",
  height: "315px",
  avatar: "/assets/testimonial4.png",
  name:"Arlene McCoy",
  work_position:"influencer",
  summary: "So much easier and faster to edit content than it is to create it from scratch.",
  content: `Creating unique content can be so arduous and time-consuming. I love Trumpet.ai because Trumpet.ai comes up with content for me in a matter of seconds, saving me valuable time and effort.`,
},

]