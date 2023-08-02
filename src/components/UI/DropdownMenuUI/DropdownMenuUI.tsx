"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { GoChevronRight } from "react-icons/go";

interface DropdownMenuProps {
  dropDownLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
}

const DropdownMenuUI = ({ dropDownLabel, menuItems }: DropdownMenuProps) => {
  const defaultValue = dropDownLabel === "Tone" ? menuItems[0] : "";
  const [selectedItem, setSelectedItem] = useState(defaultValue);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="normalButton" aria-label="dropdown button">
            {selectedItem === ""
              ? dropDownLabel
              : `${dropDownLabel} : ${selectedItem}`}
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
                  {typeof item === "object" ? (
                    <DropdownMenu.Sub>
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
                            <>
                              <DropdownMenu.RadioItem
                                key={item.toString()}
                                className="DropdownMenuRadioItem"
                                value={item}
                              >
                                {item}
                              </DropdownMenu.RadioItem>

                              {index < menuItems.length - 1 && (
                                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                              )}
                            </>
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
                </>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownMenuUI;
