"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface DropdownMenuProps {
  selectedLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
  hasSubDropdown: boolean;
}

const DropdownMenuUI = ({
  selectedLabel,
  menuItems,
  hasSubDropdown,
}: DropdownMenuProps) => {
  const defaultValue =
    selectedLabel === "Tone : Professional" ? menuItems[0] : "";
  const [selectedItem, setSelectedItem] = useState(defaultValue);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="normalButton" aria-label="dropdown button">
            {selectedLabel}
            <HiOutlineChevronDown />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={4}>
            {/* TODO NEED TO FIND BETTER OPTIONS */}
            <DropdownMenu.RadioGroup
              value={
                typeof selectedItem === "object"
                  ? selectedItem.subLabel
                  : selectedItem
              }
              onValueChange={setSelectedItem}
            >
              {menuItems.map((item, index) => (
                <>
                  <DropdownMenu.RadioItem
                    key={item.toString()}
                    className="DropdownMenuRadioItem"
                    value={typeof item === "object" ? item.subLabel : item}
                  >
                    {typeof item === "object" ? item.subLabel : item}
                  </DropdownMenu.RadioItem>

                  {index < menuItems.length - 1 && (
                    <DropdownMenu.Separator className="DropdownMenuSeparator" />
                  )}
                </>
              ))}
            </DropdownMenu.RadioGroup>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger />
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent />
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownMenuUI;
