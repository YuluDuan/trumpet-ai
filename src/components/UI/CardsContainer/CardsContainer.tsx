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
import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
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

  const [allBlurbs, setAllBlurbs] = useState([blurb, ...variantBlurbs]);

  // set the inital values of allBlurbs array
  const prevVariantBlurbs = useRef(variantBlurbs);
  const prevBlurb = useRef(blurb);

  useEffect(() => {
    if (
      !isEqual(prevVariantBlurbs.current, variantBlurbs) ||
      !isEqual(prevBlurb.current, blurb)
    ) {
      setAllBlurbs([blurb, ...variantBlurbs]);
    }
    prevVariantBlurbs.current = variantBlurbs;
    prevBlurb.current = blurb;
  }, [blurb, variantBlurbs]);

  return (
    <>
      {allBlurbs.slice(0, 1).map((blurb, index) => (
        <Card
          img={imageMatch(platform.name, PLATFORM_IMAGE).src}
          platform={platform}
          blurb={blurb}
          isVariantCard={false}
          index={index}
          setAllBlurbs={setAllBlurbs}
          allBlurbs={allBlurbs}
          key={blurb.content}
        />
      ))}

      {/* VariantsCard */}
      {showVariants &&
        allBlurbs.slice(1).map((blurb, index) => (
          <div className="variants" key={blurb.content}>
            <Card
              img={imageMatch(platform.name, PLATFORM_IMAGE).src}
              platform={platform}
              blurb={blurb}
              isVariantCard={true}
              index={++index}
              setAllBlurbs={setAllBlurbs}
              allBlurbs={allBlurbs}
            />
          </div>
        ))}
    </>
  );
};

export default CardsContainer;
