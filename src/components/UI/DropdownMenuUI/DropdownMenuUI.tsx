"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { GoChevronRight } from "react-icons/go";
import { useVariantContext } from "@/context/VariantContext";
import React from "react";

interface DropdownMenuProps {
  dropDownLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
}

const DropdownMenuUI = ({ dropDownLabel, menuItems }: DropdownMenuProps) => {
  const defaultValue = dropDownLabel === "Tone" ? menuItems[0] : "";
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  const { numVariants, setVariants } = useVariantContext();

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="normalButton" aria-label="dropdown button">
            {/* {selectedItem === ""
              ? dropDownLabel
              : dropDownLabel === "Tone" || dropDownLabel === "Variants"
              ? `${dropDownLabel} : ${selectedItem}`
              : dropDownLabel} */}

            {dropDownLabel === "Variants" && numVariants === ""
              ? dropDownLabel
              : dropDownLabel === "Tone"
              ? `${dropDownLabel} : ${selectedItem}`
              : dropDownLabel === "Variants"
              ? `${dropDownLabel} : ${numVariants}`
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
                  : dropDownLabel === "variants"
                  ? numVariants
                  : selectedItem
              }
              onValueChange={
                dropDownLabel === "Variants" ? setVariants : setSelectedItem
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
                      className="DropdownMenuRadioItem"
                      value={item}
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
