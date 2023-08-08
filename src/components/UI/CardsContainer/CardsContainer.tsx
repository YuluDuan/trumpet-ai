"use client";

import Card from "@/components/Card";
import { useVariantContext } from "@/context/VariantContext";
import { PLATFORM_IMAGE, imageMatch } from "@/lib/utils";
import { RootState } from "@/store";
import {
  selectFirstBlurbByPlatformId,
  selectNBlurbsByPlatformId,
} from "@/store/blurbsSlice";
import { Platform } from "@/types";
import { useSelector } from "react-redux";

interface CardsContainerProps {
  platform: Platform;
}

const CardsContainer = ({ platform }: CardsContainerProps) => {
  const { numVariants, showVariants } = useVariantContext();

  const variantBlurbs = useSelector((state: RootState) =>
    selectNBlurbsByPlatformId(state, platform.id, Number(numVariants))
  );

  const blurb = useSelector((state: RootState) =>
    selectFirstBlurbByPlatformId(state, platform.id)
  );

  return (
    <>
      <Card
        img={imageMatch(platform.name, PLATFORM_IMAGE).src}
        platform={platform}
        text={blurb.content}
        isVariantCard={false}
      />

      {/* VariantsCard */}
      {variantBlurbs.length > 0 &&
        showVariants &&
        variantBlurbs.map((blurb, index) => (
          <div className="variants" key={`VariantsCard-${index}`}>
            <Card
              img={imageMatch(platform.name, PLATFORM_IMAGE).src}
              platform={platform}
              text={blurb.content}
              isVariantCard={true}
            />
          </div>
        ))}
    </>
  );
};

export default CardsContainer;
