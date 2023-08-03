import Instagram from "../../public/assets/ins.svg";
import LinkedIn from "../../public/assets/linkedin.svg";
import Twitter from "../../public/assets/twitter.svg";
import Tiktok from "../../public/assets/tiktok.png";
import { StaticImageData } from "next/image";

export const PLATFORM_IMAGE :  { [key: string]: StaticImageData } = {
    "LinkedIn": LinkedIn,
    "Instagram": Instagram,
    "Twitter": Twitter,
    "Tiktok": Tiktok,
}

export const imageMatch = (platform: string, images: { [key: string]: StaticImageData }) : StaticImageData => {
    return images[platform] || Tiktok;
  };