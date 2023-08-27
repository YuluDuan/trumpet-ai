import React from "react";
import SliderComponent from "../UI/SliderComponent/SliderComponent";

const DefaultSettingCard = () => {
  return (
    <div className="DefaultSettingCard-container">
      <SliderComponent max={2200} label="Characters" isLast={false} />
      <SliderComponent max={30} label="Hashtags:" isLast={true} />
    </div>
  );
};

export default DefaultSettingCard;
