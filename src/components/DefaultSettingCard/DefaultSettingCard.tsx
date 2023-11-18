import SliderComponent from "../UI/SliderComponent/SliderComponent";
import DropDownTooltip from "../UI/DropDownTooltip/DropDownTooltip";
import DropdownUser from "../UI/DropdownMenuUI/DropdownUser";

import { PlatformConfig } from "@prisma/client";

import { USER_CENTER_DROPDOWN } from "@/lib/utils";

interface DefaultSettingCardProps {
  platform: string;
  platformConfigs: PlatformConfig[];
}

const DefaultSettingCard = ({
  platform,
  platformConfigs,
}: DefaultSettingCardProps) => {
  const platformConfig: PlatformConfig =
    platformConfigs.find((config) => config.isDefault === null) ||
    platformConfigs[0];

  return (
    <div className="DefaultSettingCard-container">
      <SliderComponent
        defaultValue={platformConfig.characterCount}
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
            menuItems={USER_CENTER_DROPDOWN["Tone"]}
            defaultValue={platformConfig.tone}
          />
        </div>
      </div>

      <div className="dropdown-item-2">
        <div className="dropdown-item-1st">
          <span>Emoji:</span>
          <DropdownUser
            dropDownLabel={"Default Quantity"}
            menuItems={USER_CENTER_DROPDOWN["Default Quantity"]}
            defaultValue={platformConfig.emojiQuantity}
          />
        </div>

        <div className="dropdown-container-2nd">
          <DropdownUser
            dropDownLabel={"Default Vibe"}
            menuItems={USER_CENTER_DROPDOWN["Default Vibe"]}
            defaultValue={platformConfig.emojiVibe}
          />
        </div>
      </div>

      <SliderComponent
        defaultValue={platformConfig.hashtagCount}
        max={30}
        label="Hashtags:"
        isLast={true}
      />
    </div>
  );
};

export default DefaultSettingCard;
