import React from "react";
import SliderComponent from "../UI/SliderComponent/SliderComponent";
import { characterLimits, hashtagLimits } from "@/lib/utils";
interface DefaultSettingCardProps {
  platform: string;
}

const DefaultSettingCard = ({ platform }: DefaultSettingCardProps) => {
  return (
    <div className="DefaultSettingCard-container">
      <SliderComponent
        defaultValue={characterLimits[platform]}
        max={2200}
        label="Characters"
        isLast={false}
      />
      <SliderComponent
        defaultValue={hashtagLimits[platform]}
        max={30}
        label="Hashtags:"
        isLast={true}
      />
    </div>
  );
};

export default DefaultSettingCard;
