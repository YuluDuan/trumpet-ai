"use client";

import * as Switch from "@radix-ui/react-switch";

import { useForm, FieldErrors, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDateSchema } from "@/types";

import { useState } from "react";
import Image from "next/image";
import { PLATFORM_IMAGE, imageMatch } from "@/lib/utils";

type FormData = {
  brandName: string;
  theme: string;
  description: string;
  links: string;
  targetAudience: string;
  platforms: number[];
  includeEmojis: boolean;
  includeHashtags: boolean;
};

function TextGenerationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      brandName: "", // can fetch the inital state
      theme: "",
      description: "",
      links: "",
      targetAudience: "",
      platforms: [1, 2, 3, 4],
      includeEmojis: true,
      includeHashtags: true,
    },
    resolver: zodResolver(formDateSchema),
  });

  // will retrieve from redux store
  const platforms = [
    { id: 1, name: "Instagram" },
    { id: 2, name: "Linkedin" },
    { id: 3, name: "Twitter" },
    { id: 4, name: "TikTok" },
  ];

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
      <div className="scrollable-content">
        <div>
          <label className="form_label" htmlFor="brandName">
            Product/Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Example: trumpet-ai"
            {...register("brandName")}
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
            {...register("description")}
            className={errors.description ? "error-description" : ""}
            onChange={(e) => setCount(e.target.value.length)}
          />
          <small className="error">{errors.description?.message}</small>
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

        <div className="checkbox">
          <h2 className="form_label">Platform</h2>
          <div className="checkbox-input">
            {platforms.map(({ id, name }) => (
              <div key={id} className="checkbox-container">
                <label htmlFor={name} className="icon">
                  <Image
                    src={imageMatch(name, PLATFORM_IMAGE).src}
                    width={40}
                    height={40}
                    alt={name}
                  />
                  <input
                    type="checkbox"
                    id={name}
                    {...register("platforms")}
                    value={id}
                    defaultChecked={true}
                  />
                  <span className="custom-checkbox"></span>
                </label>
              </div>
            ))}
          </div>
          <small className="error">{errors.platforms?.message}</small>
        </div>

        <div className="switch">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <label
              className="Label"
              htmlFor="includeEmojis"
              style={{ paddingRight: 15 }}
            >
              Include Emoji:
            </label>
            <Controller
              control={control}
              name="includeEmojis"
              render={({ field: { onChange, value } }) => (
                <Switch.Root
                  className="SwitchRoot"
                  id="includeEmojis"
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
              htmlFor="includeHashtags"
              style={{ paddingRight: 15 }}
            >
              Include Hastags:
            </label>
            <Controller
              control={control}
              name="includeHashtags"
              render={({ field: { onChange, value } }) => {
                return (
                  <Switch.Root
                    className="SwitchRoot"
                    id="includeHashtags"
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
      </div>

      <button className="submit-btn">Generate</button>
    </form>
  );
}

export default TextGenerationForm;
