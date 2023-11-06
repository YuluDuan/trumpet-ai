"use client";

import { useVariantContext } from "@/context/VariantContext";
import { useBlurbGenerationContext } from "@/context/BlurbGenerationContext";
import { DROPDOWNTYPE, PLATFORM } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Dropdown from "./Dropdown";
import { toneMatchHelper } from "@/lib/utils";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/provider";
import { addMoreBlurbVariants, getMoreVariants, selectFirstBlurbByPlatformId } from "@/store/blurbsSlice";

interface DropdownMenuProps {
  dropDownLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
  platform: string;
}

const DropdownCard = ({
  dropDownLabel,
  menuItems,
  platform,
}: DropdownMenuProps) => {
  const dispatch = useAppDispatch();
  const blurbRequest = useSelector((state:RootState) => state.blurbRequest.blurbRequest);

  const { numVariants, setVariants } = useVariantContext();
  const defaultValue =
    dropDownLabel === "Tone" ? menuItems[toneMatchHelper(platform)] : "";
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  const { regenerate } = useBlurbGenerationContext();
  const blurb = useAppSelector(state => selectFirstBlurbByPlatformId(state, platform))

  function handleSelect(action: string) {
    console.log(action);
    // add variants
    if (action === "1" || action === "2" || action === "3") {
      if (blurbRequest) {
        dispatch(addMoreBlurbVariants({
          blurbRequestId: blurbRequest.id, 
          platformName:platform as PLATFORM, 
          variantCount: Number.parseInt(action)
        }))
      }
    } else {
      regenerate(platform as PLATFORM, blurb?.content || "", action);
    }
  }

  return (
    <>
      <Dropdown
        dropDownLabel={dropDownLabel}
        menuItems={menuItems}
        numVariants={numVariants}
        setVariants={setVariants}
        dropdownType={DROPDOWNTYPE.mainPage}
        handleSelect={handleSelect}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
};

export default DropdownCard;
