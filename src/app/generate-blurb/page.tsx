'use client'
import Sidebar from "@/components/Sidebar";
import TextGenerationForm from "@/components/TextGenerationForm";
import { GenerateBlurbContextProvider } from "@/context/GenerateBlurbContext/Provider";
import { useGenerateBlurbContext } from "@/context/GenerateBlurbContext/Context";
import GeneratedBlurb from "@/components/GeneratedBlurb";

const GenerateBlurb = () => {
  const {LINKED_IN, INSTAGRAM,TWITTER,TIK_TOK } = useGenerateBlurbContext();
  return (
      <>
        <Sidebar>
          <TextGenerationForm/>
        </Sidebar>
        <div>
          <GeneratedBlurb blurbContext={INSTAGRAM}/>
          <GeneratedBlurb blurbContext={TWITTER}/>
          <GeneratedBlurb blurbContext={TIK_TOK}/>
          <GeneratedBlurb blurbContext={LINKED_IN}/>
        </div>
      </>
  );
};

export default GenerateBlurb;
