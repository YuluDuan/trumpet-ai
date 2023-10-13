import SliderComponent from "../UI/SliderComponent/SliderComponent";
import DropDownTooltip from "../UI/DropDownTooltip/DropDownTooltip";
import DropdownUser from "../UI/DropdownMenuUI/DropdownUser";

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
          <DropdownUser
            dropDownLabel={"Tone"}
            menuItems={cardDropdownOptions(false)["Tone"]}
            platform={platform}
          />
        </div>
      </div>

      <div className="dropdown-item-2">
        <div className="dropdown-item-1st">
          <span>Emoji:</span>
          <DropdownUser
            dropDownLabel={"Default Quantity"}
            menuItems={USER_CENTER_DROPDOWN["Default Quantity"]}
            platform={platform}
          />
        </div>

        <div className="dropdown-container-2nd">
          <DropdownUser
            dropDownLabel={"Default Vibe"}
            menuItems={USER_CENTER_DROPDOWN["Default Vibe"]}
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
