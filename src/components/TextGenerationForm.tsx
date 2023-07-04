"use client";

import * as Switch from "@radix-ui/react-switch";
import { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
type FormData = {
  brandname: string;
  theme: string;
  description: string;
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

const getInitialData = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = window.localStorage.getItem("formData");
      if (!data)
        return {
          brandname: "", // can fetch the inital state
          theme: "",
          description: "",
          links: "",
          platforms: {
            instagram: true,
            linkedin: true,
            ticktok: true,
            tweeter: true,
          },
          emoji: true,
          hashtags: true,
        };
      return JSON.parse(data);
    }
  } catch (e) {
    console.log("no localstorage!", e);
  }
};

function TextGenerationForm(): JSX.Element {
  const initialData = getInitialData();
  const [enabledEmoji, setEnabledEmoji] = useState(initialData.emoji);
  const [enabledTags, setEnableTags] = useState(initialData.hashtags);

  function handleChangeEmoji() {
    setEnabledEmoji((currData: boolean) => {
      const updatedData = !currData;
      setValue("emoji", updatedData, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      return updatedData;
    });
  }

  function handleChangeTags() {
    setEnableTags((currData: boolean) => {
      const updatedData = !currData;
      setValue("hashtags", updatedData, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      return updatedData;
    });
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: initialData,
  });

  const watchedForm = watch();
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(watchedForm));
  }, [watchedForm]);

  const registerOptions = {
    description: {
      required: "Please enter at least 10 characters.",
      minLength: {
        value: 10,
        message: "Please enter at least 10 characters.",
      },

      maxLength: {
        value: 80,
        message: "The maximum character limit is 80.",
      },
    },
  };

  const onSubmit = (formData: FormData) => {
    console.log("Form Submitted", formData);
  };

  const handleError = (errors: FieldErrors<FormData>) => {
    console.log("Form errors", errors);
  };

  return (
    <form
      className="text-generated-form"
      onSubmit={handleSubmit(onSubmit, handleError)}
      noValidate
    >
      <div className="text-input">
        <div>
          <label htmlFor="brandname">Product/Brand Name</label>
          <input
            type="text"
            id="brandname"
            placeholder="Example: trumpet-ai"
            {...register("brandname")}
          />
        </div>
        <div>
          <label htmlFor="theme">Theme (Optional)</label>
          <input
            type="text"
            id="theme"
            placeholder="Example: Generate Content"
            {...register("theme")}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Example: Topics"
            {...register("description", registerOptions.description)}
            className={errors.description ? "error-description" : ""}
          />
          <small className="error">
            {errors?.description && errors.description.message}
          </small>
        </div>
        <div>
          <label htmlFor="links">Links</label>
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
