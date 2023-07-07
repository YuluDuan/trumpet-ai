"use client";

import * as Switch from "@radix-ui/react-switch";
import { useForm, FieldErrors, Controller } from "react-hook-form";
import Ins from "@/assets/ins.svg";
import Linkedin from "@/assets/linkedin.svg";
import Twitter from "@/assets/twitter.svg";
import Ticktok from "@/assets/ticktok.png";
import { useState } from "react";
type FormData = {
  brandname: string;
  theme: string;
  description: string;
  links: string;
  platforms: {
    instagram: boolean;
    linkedin: boolean;
    twitter: boolean;
    ticktok: boolean;
  };
  emoji: boolean;
  hashtags: boolean;
};

function TextGenerationForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      brandname: "", // can fetch the inital state
      theme: "",
      description: "",
      links: "",
      platforms: {
        instagram: true,
        linkedin: true,
        twitter: true,
        ticktok: true,
      },
      emoji: true,
      hashtags: true,
    },
  });

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

  const [count, setCount] = useState(0);

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
          <label className="form_label" htmlFor="brandname">
            Product/Brand Name
          </label>
          <input
            type="text"
            id="brandname"
            placeholder="Example: trumpet-ai"
            {...register("brandname")}
            className="form_text"
          />
        </div>
        <div>
          <label className="form_label" htmlFor="theme">
            Theme <span className="optional">(Optional)</span>
          </label>
          <input
            type="text"
            id="theme"
            placeholder="Example: Generate Content"
            {...register("theme")}
            className="form_text"
          />
        </div>
        <div className="text-area">
          <div className="description-label">
            <label className="form_label" htmlFor="description">
              Description
            </label>
            <span className="count">{count}/80</span>
          </div>
          <textarea
            id="description"
            placeholder="Example: Topics"
            {...register("description", registerOptions.description)}
            className={errors.description ? "error-description" : ""}
            onChange={(e) => setCount(e.target.value.length)}
          />
          <small className="error">
            {errors?.description && errors.description.message}
          </small>
        </div>
        <div>
          <label className="form_label" htmlFor="links">
            Links <span className="optional">(Optional)</span>
          </label>
          <input
            type="text"
            id="links"
            placeholder="Example: google.com"
            {...register("links")}
            className="form_text"
          />
        </div>
      </div>
      <h2 className="form_label">Platform</h2>
      <div className="checkbox-input">
        <div className="checkbox-container">
          <label htmlFor="instagram" className="icon">
            <img src={Ins.src} />
            <input
              type="checkbox"
              id="instagram"
              {...register("platforms.instagram")}
            />
            <span className="custom-checkbox"></span>
          </label>
        </div>

        <div className="checkbox-container">
          <label className="icon" htmlFor="linkedin">
            <img src={Linkedin.src} />
            <input
              type="checkbox"
              id="linkedin"
              {...register("platforms.linkedin")}
            />
            <span className="custom-checkbox"></span>
          </label>
        </div>
        <div className="checkbox-container">
          <label className="icon" htmlFor="twitter">
            <img src={Twitter.src} />
            <input
              type="checkbox"
              id="twitter"
              {...register("platforms.twitter")}
            />
            <span className="custom-checkbox"></span>
          </label>
        </div>

        <div className="checkbox-container">
          <label className="icon" htmlFor="ticktok">
            <img src={Ticktok.src} />
            <input
              type="checkbox"
              id="ticktok"
              {...register("platforms.ticktok")}
            />
            <span className="custom-checkbox"></span>
          </label>
        </div>
      </div>

      <div className="switch">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label className="Label" htmlFor="emoji" style={{ paddingRight: 15 }}>
            Include Emoji:
          </label>
          <Controller
            control={control}
            name="emoji"
            render={({ field: { onChange, value } }) => (
              <Switch.Root
                className="SwitchRoot"
                checked={value}
                onCheckedChange={onChange}
              >
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root>
            )}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label
            className="Label"
            htmlFor="hashtags"
            style={{ paddingRight: 15 }}
          >
            Include Hastags:
          </label>
          <Controller
            control={control}
            name="hashtags"
            render={({ field: { onChange, value } }) => {
              return (
                <Switch.Root
                  className="SwitchRoot"
                  checked={value}
                  onCheckedChange={(nextValue) => {
                    onChange(nextValue);
                  }}
                >
                  <Switch.Thumb className="SwitchThumb" />
                </Switch.Root>
              );
            }}
          />
        </div>
      </div>

      <button className="submit-btn">Generate</button>
    </form>
  );
}

export default TextGenerationForm;
