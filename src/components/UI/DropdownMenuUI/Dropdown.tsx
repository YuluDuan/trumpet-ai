"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineChevronDown } from "react-icons/hi";
import { GoChevronRight } from "react-icons/go";
import React from "react";
import { DROPDOWNTYPE } from "@/types";

interface DropdownProps {
  dropDownLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
  numVariants?: string;
  setVariants?: (value: string) => void;
  dropdownType: DROPDOWNTYPE;
  handleSelect: (action: string) => void;
  selectedItem:
    | string
    | {
        subLabel: string;
        items: string[];
      };
  setSelectedItem: React.Dispatch<
    React.SetStateAction<
      | string
      | {
          subLabel: string;
          items: string[];
        }
    >
  >;
}

const Dropdown = ({
  dropDownLabel,
  menuItems,
  numVariants,
  setVariants,
  dropdownType,
  handleSelect,
  setSelectedItem,
  selectedItem,
}: DropdownProps) => {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={`normalButton ${
              dropdownType === "userType" ? "user-center-dropdown" : ""
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
                        dropdownType === "userType"
                          ? "user-center-dropdown"
                          : ""
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

export default Dropdown;
