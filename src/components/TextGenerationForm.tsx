"use client";

import * as Switch from "@radix-ui/react-switch";
import { useForm, FieldErrors, Controller } from "react-hook-form";
import Ins from "../../public/assets/ins.svg";
import Linkedin from "../../public/assets/linkedin.svg";
import Twitter from "../../public/assets/twitter.svg";
import Tiktok from "../../public/assets/tiktok.png";
import { useState } from "react";

type FormData = {
  brandname: string;
  theme: string;
  description: string;
  links: string;
  targetAudience: string;
  platforms: {
    instagram: boolean;
    linkedin: boolean;
    twitter: boolean;
    tiktok: boolean;
  };
  emoji: boolean;
  hashtags: boolean;
};

function TextGenerationForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      brandname: "", // can fetch the inital state
      theme: "",
      description: "",
      links: "",
      targetAudience: "",
      platforms: {
        instagram: true,
        linkedin: true,
        twitter: true,
        tiktok: true,
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
  const [canSubmit, setCanSubmit] = useState(true);

  const watchInstagram = watch("platforms.instagram");
  const watchLinkedIn = watch("platforms.linkedin");
  const watchTwitter = watch("platforms.twitter");
  const watchTiktok = watch("platforms.tiktok");

  const onSubmit = (formData: FormData) => {
    if (!(watchInstagram || watchLinkedIn || watchTwitter || watchTiktok)) {
      setCanSubmit(false);
      console.log("Please select at least one platform.");
      return;
    }

    setCanSubmit(true);
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
            rows={3}
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
          <textarea
            id="links"
            placeholder="Example: google.com"
            {...register("links")}
            className="form_text"
          />
        </div>

        <div>
          <label className="form_label" htmlFor="targetAudience">
            Target Audience <span className="optional">(Optional)</span>
          </label>
          <input
            type="text"
            id="targetAudience"
            placeholder="Young Professional in Tech"
            {...register("targetAudience")}
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
          <label className="icon" htmlFor="tiktok">
            <img src={Tiktok.src} />
            <input
              type="checkbox"
              id="tiktok"
              {...register("platforms.tiktok")}
            />
            <span className="custom-checkbox"></span>
          </label>
        </div>
      </div>

      {!canSubmit && (
        <small className="error">Please select at least one platform.</small>
      )}

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
                id="emoji"
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
                  id="hashtags"
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
