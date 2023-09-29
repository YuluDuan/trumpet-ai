"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { GoChevronRight } from "react-icons/go";
import { useVariantContext } from "@/context/VariantContext";
import React from "react";
import { toneMatchHelper } from "@/lib/utils";
import { useBlurbGenerationContext } from "@/context/BlurbGenerationContext";
import { PLATFORM } from "@/types";
import { useSelector } from "react-redux";
import { selectAllBlurbsByPlatformId, selectFirstBlurbByPlatformId } from "@/store/blurbsSlice";
import { RootState } from "@/store";

interface DropdownMenuProps {
  dropDownLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
  IsOnUserCenter?: boolean;
  platform: string;
}

const DropdownMenuUI = ({
  dropDownLabel,
  menuItems,
  IsOnUserCenter,
  platform,
}: DropdownMenuProps) => {
  const defaultValue =
    dropDownLabel === "Tone" ? menuItems[toneMatchHelper(platform)] : "";
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  const { numVariants, setVariants } = useVariantContext();

  const {regenerate} = useBlurbGenerationContext();
  const blurb = useSelector((state: RootState) => selectFirstBlurbByPlatformId(state, platform))

  function handleSelect(action: string) {
    regenerate(platform as PLATFORM, blurb?.content, action);
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={`normalButton ${
              IsOnUserCenter ? "user-center-dropdown" : ""
            }`}
            aria-label="dropdown button"
          >
            {dropDownLabel === "Tone"
              ? `${dropDownLabel} : ${selectedItem}`
              : (dropDownLabel === "Default Quantity" && selectedItem) ||
                (dropDownLabel === "Default Vibe" && selectedItem)
              ? `${selectedItem}`
              : dropDownLabel}
            <HiOutlineChevronDown />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={4}>
            <DropdownMenu.RadioGroup
              value={
                typeof selectedItem === "object"
                  ? selectedItem.subLabel
                  : dropDownLabel === "Add Variants"
                  ? numVariants
                  : selectedItem
              }
              onValueChange={
                dropDownLabel === "Add Variants" ? setVariants : setSelectedItem
              }
            >
              {menuItems.map((item, index) => (
                <React.Fragment key={`DropdownMenuItems-${index} `}>
                  {typeof item === "object" ? (
                    <DropdownMenu.Sub key={`DropdownMenuSub-${index}`}>
                      <DropdownMenu.SubTrigger className="DropdownMenuRadioItem">
                        {item.subLabel}
                        <div className="RightSlot">
                          <GoChevronRight />
                        </div>
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                          className="DropdownMenuSubContent"
                          sideOffset={7}
                          alignOffset={2}
                        >
                          {item.items.map((item, index) => (
                            <React.Fragment key={item.toString()}>
                              <DropdownMenu.RadioItem
                                className="DropdownMenuRadioItem"
                                value={item}
                                onSelect={() => handleSelect(item)}
                              >
                                {item}
                              </DropdownMenu.RadioItem>

                              {index < menuItems.length - 1 && (
                                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                              )}
                            </React.Fragment>
                          ))}
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                  ) : (
                    <DropdownMenu.RadioItem
                      key={item.toString()}
                      className={`DropdownMenuRadioItem ${
                        IsOnUserCenter ? "user-center-dropdown" : ""
                      }`}
                      value={item}
                      onSelect={() => handleSelect(item)}
                    >
                      {item}
                    </DropdownMenu.RadioItem>
                  )}

                  {index < menuItems.length - 1 && (
                    <DropdownMenu.Separator className="DropdownMenuSeparator" />
                  )}
                </React.Fragment>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownMenuUI;
