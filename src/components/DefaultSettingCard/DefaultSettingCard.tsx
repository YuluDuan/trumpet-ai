import SliderComponent from "../UI/SliderComponent/SliderComponent";
import DropdownMenuUI from "@/components/UI/DropdownMenuUI/DropdownMenuUI";

import {
  characterLimits,
  hashtagLimits,
  USER_CENTER_DROPDOWN,
  cardDropdownOptions,
} from "@/lib/utils";

interface DefaultSettingCardProps {
  platform: string;
}

const DefaultSettingCard = ({ platform }: DefaultSettingCardProps) => {
  return (
    <div className="DefaultSettingCard-container">
      <SliderComponent
        defaultValue={characterLimits[platform]}
        max={2200}
        label="Characters:"
        isLast={false}
      />

      <div className="dropdown-item">
        <span>Tone:</span>
        <DropdownMenuUI
          dropDownLabel={"Tone"}
          menuItems={cardDropdownOptions(false)["Tone"]}
          IsOnUserCenter={true}
          platform={platform}
        />
      </div>

      <div className="dropdown-item">
        <span>Emoji:</span>
        {Object.keys(USER_CENTER_DROPDOWN).map((label, index) => (
          <DropdownMenuUI
            key={`DROPDOWN_OPTIONS-${index}`}
            dropDownLabel={label}
            menuItems={USER_CENTER_DROPDOWN[label]}
            IsOnUserCenter={true}
            platform={platform}
          />
        ))}
      </div>

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
