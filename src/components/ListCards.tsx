import Card from "./Card";
import Ins from "../../public/assets/ins.svg";
import Linkedin from "../../public/assets/linkedin.svg";
import Twitter from "../../public/assets/twitter.svg";
import Tiktok from "../../public/assets/tiktok.png";

export type Platform = "Linkedin" | "Twitter" | "Tiktok" | "Ins";

export type blurb = {
  id: string;
  platform: Platform;
  text: string;
};

interface Props {
  blurbs: blurb[];
}

const ListCards = ({ blurbs }: Props) => {
  const imageMatch = (platform: string) => {
    switch (platform) {
      case "Linkedin":
        return Linkedin;
      case "Ins":
        return Ins;
      case "Twitter":
        return Twitter;
      case "Tiktok":
        return Tiktok;
      default:
        return null;
    }
  };

  return (
    <>
      {blurbs.map((blurb) => (
        <Card img={imageMatch(blurb.platform)?.src} text={blurb.text} />
      ))}
    </>
  );
};

export default ListCards;
