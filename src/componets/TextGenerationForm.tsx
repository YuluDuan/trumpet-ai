"use client";

import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "@/styles/switch.scss";
type FormData = {
  brandname: string;
  theme: string;
  keywords: string;
  links: string;
  platforms: {
    instagram: boolean;
    linkedin: boolean;
    ticktok: boolean;
    tweeter: boolean;
  };
  emoji: boolean;
  hashtags: boolean;
};

function TextGenerationForm(): JSX.Element {
  const [enabledEmoji, setEnabledEmoji] = useState(true);
  const [enabledTags, setEnableTags] = useState(true);

  function handleChangeEmoji() {
    setEnabledEmoji((currData) => {
      const updatedData = !currData;
      setValue("hashtags", updatedData);
      return updatedData;
    });
  }

  function handleChangeTags() {
    setEnableTags((currData) => {
      const updatedData = !currData;
      setValue("emoji", updatedData);
      return updatedData;
    });
  }

  const { register, handleSubmit, setValue } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      brandname: "", // can fetch and preload saved data
      theme: "",
      keywords: "",
      links: "",
      platforms: {
        instagram: true,
        linkedin: true,
        ticktok: true,
        tweeter: true,
      },
      emoji: true,
      hashtags: true,
    },
  });

  const onSubmit = (formData: FormData) => {
    console.log("Form Submitted", formData);
  };

  return (
    <form className="text-generated-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-input">
        <div>
          <label htmlFor="brandname">Product/Brand Name:</label>
          <input
            type="text"
            id="brandname"
            placeholder="Example: trumpet-ai"
            {...register("brandname")}
          />
        </div>
        <div>
          <label htmlFor="theme">Theme(optional):</label>
          <input
            type="text"
            id="theme"
            placeholder="Example: Generate Content"
            {...register("theme")}
          />
        </div>
        <div>
          <label htmlFor="keywords">Key Words:</label>
          <input
            type="text"
            id="keywords"
            placeholder="Example: Topics"
            {...register("keywords")}
          />
        </div>
        <div>
          <label htmlFor="links">Links:</label>
          <input
            type="text"
            id="links"
            placeholder="Example: google.com"
            {...register("links")}
          />
        </div>
      </div>

      <div className="checkbox-input">
        <div>
          <label htmlFor="instagram">Instagram Icon</label>
          <input
            type="checkbox"
            id="instagram"
            {...register("platforms.instagram")}
          />
        </div>

        <div>
          <label htmlFor="linkedin">Linkedin Icon</label>
          <input
            type="checkbox"
            id="linkedin"
            {...register("platforms.linkedin")}
          />
        </div>

        <div>
          <label htmlFor="ticktok">Ticktok Icon</label>
          <input
            type="checkbox"
            id="ticktok"
            {...register("platforms.ticktok")}
          />
        </div>

        <div>
          <label htmlFor="tweeter">Tweeter Icon</label>
          <input
            type="checkbox"
            id="tweeter"
            {...register("platforms.tweeter")}
          />
        </div>
      </div>

      <div className="switch">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label className="Label" htmlFor="emoji" style={{ paddingRight: 15 }}>
            Include Emoji:
          </label>
          <Switch.Root
            checked={enabledEmoji}
            onClick={handleChangeEmoji}
            className="SwitchRoot"
            id="emoji"
            {...register("emoji")}
          >
            <Switch.Thumb className="SwitchThumb" />
          </Switch.Root>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="hashtags"
            style={{ paddingRight: 15 }}
          >
            Include Hastags:
          </label>
          <Switch.Root
            checked={enabledTags}
            onClick={handleChangeTags}
            className="SwitchRoot"
            id="hashtags"
            {...register("hashtags")}
          >
            <Switch.Thumb className="SwitchThumb" />
          </Switch.Root>
        </div>
      </div>

      <button className="submit-btn">Generate</button>
    </form>
  );
}

export default TextGenerationForm;
