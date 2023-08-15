"use client";

import ViewBoard from "@/components/ViewBoard";
import Sidebar from "@/components/Sidebar";
import TextGenerationForm from "@/components/TextGenerationForm";
import DraggableAndDroppable from "@/components/DraggableAndDroppable/DraggableAndDroppable";
import Image from "next/image";

import { useState } from "react";

export type Platform = "LinkedIn" | "Twitter" | "TikTok" | "Instagram";

const GenerateBlurb = () => {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  return (
    <>
      <section className="main">
        <Sidebar>
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
    </>
  );
};

export default GenerateBlurb;
