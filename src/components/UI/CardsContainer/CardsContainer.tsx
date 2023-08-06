"use client";

import Card from "@/components/Card";
import VariantContext from "@/context/VariantContext";
import { PLATFORM_IMAGE, imageMatch } from "@/lib/utils";
import { RootState } from "@/store";
import {
  selectFirstBlurbByPlatformId,
  selectNBlurbsByPlatformId,
} from "@/store/blurbsSlice";
import { Platform } from "@/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import WhiteCard from "../WhiteCard/WhiteCard";

interface CardsContainerProps {
  platform: Platform;
}

const CardsContainer = ({ platform }: CardsContainerProps) => {
  const [numVariants, setVariants] = useState("");

  const variantBlurbs = useSelector((state: RootState) =>
    selectNBlurbsByPlatformId(state, platform.id, Number(numVariants))
  );

  const blurb = useSelector((state: RootState) =>
    selectFirstBlurbByPlatformId(state, platform.id)
  );

  return (
    <>
      <VariantContext.Provider value={{ numVariants, setVariants }}>
        <Card
          img={imageMatch(platform.name, PLATFORM_IMAGE).src}
          platform={platform}
          text={blurb.content}
          isVariantCard={false}
        />

        {/* VariantsCard */}
        {variantBlurbs.length > 0 &&
          variantBlurbs.map((blurb, index) => (
            <Card
              key={`VariantsCard-${index}`}
              img={imageMatch(platform.name, PLATFORM_IMAGE).src}
              platform={platform}
              text={blurb.content}
              isVariantCard={true}
            />
          ))}
      </VariantContext.Provider>
    </>
  );
};

export default CardsContainer;
