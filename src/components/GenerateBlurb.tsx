"use client";

import ViewBoard from "@/components/ViewBoard";
import Sidebar from "@/components/Sidebar";
import TextGenerationForm from "@/components/TextGenerationForm";
import DraggableAndDroppable from "@/components/DraggableAndDroppable/DraggableAndDroppable";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BlurbGenerationProvider } from "@/context/BlurbGenerationContext";

interface GenerateBlurbProps {
  profileImage: string;
  isPro: boolean;
}

const GenerateBlurb = ({ profileImage, isPro }: GenerateBlurbProps) => {
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <BlurbGenerationProvider>
      <section className="main">
        <Sidebar profileImage={profileImage} isPro={isPro}>
          <TextGenerationForm setIsFormSubmit={setIsFormSubmit} />
        </Sidebar>

        {!isFormSubmit ? (
          <div className="pre-generate-right">
            <Image
              src="/assets/trumpet.svg"
              width={54}
              height={31}
              alt="trumpet.ai logo"
              className="trumpet"
            />
          </div>
        ) : (
          <ViewBoard>
            <DraggableAndDroppable />
          </ViewBoard>
        )}
      </section>
    </BlurbGenerationProvider>
  );
};

export default GenerateBlurb;
