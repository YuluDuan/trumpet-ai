"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface DropdownMenuProps {
  dropDownLabel: string;
  menuItems: string[];
  defaultValue: string;
}

const DropdownUser = ({
  dropDownLabel,
  menuItems,
  defaultValue,
}: DropdownMenuProps) => {
  const [selectedItem, setSelectedItem] = useState(defaultValue);
  function handleSelect(action: string) {}

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={`normalButton user-center-dropdown`}
            aria-label="dropdown button"
          >
            {dropDownLabel === "Tone"
              ? `${dropDownLabel} : ${selectedItem}`
              : dropDownLabel}
            <HiOutlineChevronDown />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={4}>
            <DropdownMenu.RadioGroup
              value={selectedItem}
              onValueChange={setSelectedItem}
            >
              {menuItems.map((item, index) => (
                <React.Fragment key={`DropdownMenuItems-${index} `}>
                  <DropdownMenu.RadioItem
                    key={item.toString()}
                    className={`DropdownMenuRadioItem user-center-dropdown`}
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
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownUser;
