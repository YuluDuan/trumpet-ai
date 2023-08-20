"use client";

import * as Switch from "@radix-ui/react-switch";

import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blurbRequestSchema, formDataSchema } from "@/types";
import Image from "next/image";
import { imageMatch, PLATFORM_IMAGE } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/store/provider";
import { useSelector } from "react-redux";
import {
  getPlatforms,
  platformSliceActions,
  selectAllPlatforms,
} from "@/store/platformSlice";
import { addNewBlurbs } from "@/store/blurbsSlice";

import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";

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

//-------- react-select custom styles ----------
interface Option {
  value: string;
  label: string;
}

const DummyComponent: React.FC = () => null;

const NoIndicators = {
  DropdownIndicator: DummyComponent,
  ClearIndicator: DummyComponent,
  IndicatorSeparator: DummyComponent,
};

const seedOptions = [
  { value: "Trumpet.ai", label: "Trumpet.ai" },
  { value: "Emoji.ai", label: "Emoji.ai" },
  { value: "Lenny's podcast", label: "Lenny's podcast" },
];
//-------- end of react-select custom styles ----------

function TextGenerationForm({
  setIsFormSubmit,
}: {
  setIsFormSubmit: (value: boolean) => void;
}): JSX.Element {
  const platforms = useSelector(selectAllPlatforms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

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
    resolver: zodResolver(formDataSchema),
  });

  const [count, setCount] = useState(0);

  const onSubmit = (formData: FormData) => {
    console.log("Form Submitted", formData);
    const blurbRequest = blurbRequestSchema.parse(formData);
    dispatch(addNewBlurbs({ blurbRequest, platformIds: formData.platforms }));
    dispatch(platformSliceActions.selectPlatforms(formData.platforms));
    setIsFormSubmit(true);
  };

  const handleError = (errors: FieldErrors<FormData>) => {
    console.log("Form errors", errors);
  };

  //-------- react-select custom styles ----------
  const customStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      background: errors.brandName
        ? "#F5F5F7"
        : state.isFocused
        ? "linear-gradient(90deg, #B65EBA 4.69%, #2E8DE1 100%)"
        : "#F5F5F7",
      backgroundOrigin: "border-box",
      border: errors.brandName
        ? `1px solid #E00000`
        : state.isFocused
        ? "1px solid transparent"
        : `1px solid #DDDDDD`,
      borderRadius: "10px",
      boxShadow: state.isFocused ? "inset 0 1000px #F5F5F7" : "none",
      borderColor: state.isFocused ? "transparent" : "#DDDDDD",
      outline: errors.brandName ? "red" : "none",
      transition: "none",
      "&:hover": {},
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      border: "1px solid #DDD",
      background: "#FFF",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    }),
    option: (provided, state) => {
      let updatedStyles = {
        ...provided,
        color: "#9C9CA4",
        background: state.isSelected ? "#F5F5F7" : "transparent",
        "&:hover": {
          backgroundColor: "#F5F5F7",
        },
      };

      // Check if it's the first or last option for border-radius
      if (state.data === seedOptions[0]) {
        updatedStyles.borderTopLeftRadius = "3px";
        updatedStyles.borderTopRightRadius = "3px";
      } else if (state.data === seedOptions[seedOptions.length - 1]) {
        updatedStyles.borderBottomLeftRadius = "3px";
        updatedStyles.borderBottomRightRadius = "3px";
      }

      return updatedStyles;
    },
  };
  //-------- end of react-select custom styles ----------

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
          <Controller
            control={control}
            defaultValue={seedOptions[0].value}
            name="brandName"
            render={({ field }) => (
              <CreatableSelect
                defaultValue={seedOptions[0]}
                ref={field.ref}
                id="brandName"
                placeholder="Example: trumpet-ai"
                isClearable
                options={seedOptions}
                className="react-select"
                onChange={(option) => field.onChange(option?.value || "")}
                // formatCreateLabel={(inputValue) =>
                //   `Add a new Product/Brand Name: ${inputValue}`
                // }
                formatCreateLabel={() => undefined}
                noOptionsMessage={() => null}
                onInputChange={(inputValue: any, actionMeta: any) => {
                  setTimeout(() => {
                    const menuEl = document.querySelector(
                      `[class*="-menu"]`
                    ) as HTMLElement;
                    const menuListEl = document.querySelector(
                      `[class*="MenuList"]`
                    ) as HTMLElement;

                    if (
                      menuListEl.children.length === 1 &&
                      menuListEl.children[0].innerHTML === ""
                    ) {
                      menuEl!.style.display = "none";
                    } else {
                      menuEl!.style.display = "block";
                    }
                  });
                }}
                value={seedOptions.find(
                  (option) => option.value === field.value
                )}
                styles={customStyles}
                components={NoIndicators}
              />
            )}
          />
          <small className="error error-brandName">
            {errors.brandName?.message}
          </small>
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
                    src={imageMatch(name, PLATFORM_IMAGE)}
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
