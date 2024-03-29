"use client";

import Card from "@/components/Card";
import { useVariantContext } from "@/context/VariantContext";
import { PLATFORM_IMAGE, imageMatch } from "@/lib/utils";
import { RootState } from "@/store";
import {
  selectFirstBlurbByPlatformId,
  selectNBlurbsByPlatformId,
  selectVariantsByPlatformName,
} from "@/store/blurbsSlice";
import { useAppSelector } from "@/store/provider";
import { Platform } from "@/types";
import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface CardsContainerProps {
  platform: Platform;
}

const CardsContainer = ({ platform }: CardsContainerProps) => {
  const { numVariants, showVariants } = useVariantContext();

  const blurb = useSelector((state: RootState) =>
    selectFirstBlurbByPlatformId(state, platform.id)
  );

  const variantBlurbs = useAppSelector((state:RootState) => 
    selectVariantsByPlatformName(state, platform.name)
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
      <Card
        key={blurb.id}
        blurbId={blurb.id}
      />
      {/* VariantsCard */}
      {showVariants &&
        allBlurbs.slice(1).map((blurb, index) => (
          <div className="variants" key={blurb.id}>
            <Card blurbId={blurb.id} />
          </div>
        ))}
    </>
  );
};

export default CardsContainer;
