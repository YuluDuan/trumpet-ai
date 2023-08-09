import ViewBoard from "@/components/ViewBoard";
import Sidebar from "@/components/Sidebar";
import TextGenerationForm from "@/components/TextGenerationForm";
import DraggableAndDroppable from "@/components/DraggableAndDroppable/DraggableAndDroppable";

export type Platform = "LinkedIn" | "Twitter" | "TikTok" | "Instagram";

const GenerateBlurb = () => {
  return (
    <>
      <section className="main">
        <Sidebar>
          <TextGenerationForm />
        </Sidebar>

        <ViewBoard>
          <DraggableAndDroppable />
        </ViewBoard>
      </section>
    </>
  );
};

export default GenerateBlurb;
