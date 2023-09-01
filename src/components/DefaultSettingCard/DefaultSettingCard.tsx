import SliderComponent from "../UI/SliderComponent/SliderComponent";
import DropdownMenuUI from "@/components/UI/DropdownMenuUI/DropdownMenuUI";
import DropDownTooltip from "../UI/DropDownTooltip/DropDownTooltip";

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
        <div className="dropdown-tooltip">
          <DropDownTooltip />
          <DropdownMenuUI
            dropDownLabel={"Tone"}
            menuItems={cardDropdownOptions(false)["Tone"]}
            IsOnUserCenter={true}
            platform={platform}
          />
        </div>

      </div>

      <div className="dropdown-item-2">
        <div className="dropdown-item-1st">
          <span>Emoji:</span>
          <DropdownMenuUI
            dropDownLabel={"Default Quantity"}
            menuItems={USER_CENTER_DROPDOWN["Default Quantity"]}
            IsOnUserCenter={true}
            platform={platform}
          />
        </div>

        <div className="dropdown-container-2nd">
          <DropdownMenuUI
            dropDownLabel={"Default Vibe"}
            menuItems={USER_CENTER_DROPDOWN["Default Vibe"]}
            IsOnUserCenter={true}
            platform={platform}
          />
        </div>
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
