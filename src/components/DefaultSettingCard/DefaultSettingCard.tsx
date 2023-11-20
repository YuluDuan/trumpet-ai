"use client";

import SliderComponent from "../UI/SliderComponent/SliderComponent";
import DropDownTooltip from "../UI/DropDownTooltip/DropDownTooltip";
import DropdownUser from "../UI/DropdownMenuUI/DropdownUser";

import { PlatformConfig } from "@prisma/client";

import { USER_CENTER_DROPDOWN } from "@/lib/utils";

import { Controller, FormProvider, useForm } from "react-hook-form";
import AutoSave from "../AutoSave";
import { updateUserPlatformConfig } from "@/actions/platformConfig.actions";

interface DefaultSettingCardProps {
  platform: string;
  platformConfigs: PlatformConfig[];
}

interface FormData {
  characterCount: number;
  tone: string;
  emojiQuantity: string;
  emojiVibe: string;
  hashtagCount: number;
}
const DefaultSettingCard = ({
  platform,
  platformConfigs,
}: DefaultSettingCardProps) => {
  const platformConfig: PlatformConfig =
    platformConfigs.find((config) => config.isDefault === null) ||
    platformConfigs[0];

  const defaultValues = {
    characterCount: platformConfig.characterCount,
    tone: platformConfig.tone,
    emojiQuantity: platformConfig.emojiQuantity,
    emojiVibe: platformConfig.emojiVibe,
    hashtagCount: platformConfig.hashtagCount,
  };

  const methods = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const {
    formState: { errors, isDirty, dirtyFields },
  } = methods;

  const onSubmit = async (formData: FormData) => {
    await updateUserPlatformConfig(
      platform,
      formData.characterCount,
      formData.tone,
      formData.emojiQuantity,
      formData.emojiVibe,
      formData.hashtagCount
    );
  };

  return (
    <FormProvider {...methods}>
      <form className="DefaultSettingCard-container">
        <Controller
          render={({ field: { onChange, value } }) => (
            <SliderComponent
              value={value}
              max={2200}
              label="Characters:"
              isLast={false}
              onChange={onChange}
            />
          )}
          name="characterCount"
        />

        <div className="dropdown-item">
          <span>Tone:</span>
          <div className="dropdown-tooltip">
            <DropDownTooltip />
            <Controller
              render={({ field: { onChange, value } }) => (
                <DropdownUser
                  dropDownLabel={"Tone"}
                  menuItems={USER_CENTER_DROPDOWN["Tone"]}
                  value={value}
                  onChange={onChange}
                />
              )}
              name="tone"
            />
          </div>
        </div>

        <div className="dropdown-item-2">
          <div className="dropdown-item-1st">
            <span>Emoji:</span>
            <Controller
              render={({ field: { onChange, value } }) => (
                <DropdownUser
                  dropDownLabel={"Default Quantity"}
                  menuItems={USER_CENTER_DROPDOWN["Default Quantity"]}
                  value={value}
                  onChange={onChange}
                />
              )}
              name="emojiQuantity"
            />
          </div>

          <div className="dropdown-container-2nd">
            <Controller
              render={({ field: { onChange, value } }) => (
                <DropdownUser
                  dropDownLabel={"Default Vibe"}
                  menuItems={USER_CENTER_DROPDOWN["Default Vibe"]}
                  value={value}
                  onChange={onChange}
                />
              )}
              name="emojiVibe"
            />
          </div>
        </div>

        <Controller
          render={({ field: { onChange, value } }) => (
            <SliderComponent
              value={value}
              max={30}
              label="Hashtags:"
              isLast={true}
              onChange={onChange}
            />
          )}
          name="hashtagCount"
        />

        {/* <button className="submit-btn">Test</button> */}
        <AutoSave onSubmit={onSubmit} defaultValues={defaultValues} />
      </form>
    </FormProvider>
  );
};

export default DefaultSettingCard;
