"use client";
import { DROPDOWNTYPE, PLATFORM } from "@/types";
import Dropdown from "./Dropdown";
import { toneMatchHelper } from "@/lib/utils";
import { useState } from "react";

interface DropdownMenuProps {
  dropDownLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
  platform: string;
}

const DropdownUser = ({
  dropDownLabel,
  menuItems,
  platform,
}: DropdownMenuProps) => {
  const defaultValue =
    dropDownLabel === "Tone" ? menuItems[toneMatchHelper(platform)] : "";
  const [selectedItem, setSelectedItem] = useState(defaultValue);
  function handleSelect(action: string) {}

  return (
    <>
      <Dropdown
        dropDownLabel={dropDownLabel}
        menuItems={menuItems}
        dropdownType={DROPDOWNTYPE.userCenter}
        handleSelect={handleSelect}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
};

export default DropdownUser;
