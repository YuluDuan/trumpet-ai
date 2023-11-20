"use client";

import SliderComponent from "../UI/SliderComponent/SliderComponent";
import DropDownTooltip from "../UI/DropDownTooltip/DropDownTooltip";
import DropdownUser from "../UI/DropdownMenuUI/DropdownUser";

import { PlatformConfig } from "@prisma/client";

import { USER_CENTER_DROPDOWN } from "@/lib/utils";

type FormData = {
  characterCount: number;
  tone: string;
  emojiQuantity: string;
  emojiVibe: string;
  hashtagCount: number;
};

import {
  Controller,
  FieldErrors,
  FormProvider,
  useForm,
} from "react-hook-form";

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

  const defaultValues = {
    characterCount: platformConfig.characterCount,
    tone: platformConfig.tone,
    emojiQuantity: platformConfig.emojiQuantity,
    emojiVibe: platformConfig.emojiVibe,
    hashtagCount: platformConfig.hashtagCount,
  };

  const methods = useForm<FormData>({
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = methods;

  const onSubmit = (formData: FormData) => {
    console.log("Form Submitted", formData);
  };

  const handleError = (errors: FieldErrors<FormData>) => {
    console.log("Form errors", errors);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, handleError)}
        className="DefaultSettingCard-container"
      >
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
      </form>
    </FormProvider>
  );
};

export default DefaultSettingCard;
