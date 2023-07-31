import ViewBoard from "@/components/ViewBoard";
import Sidebar from "@/components/Sidebar";
import TextGenerationForm from "@/components/TextGenerationForm";
import DraggableAndDroppable from "@/components/DraggableAndDroppable/DraggableAndDroppable";

export type Platform = "Linkedin" | "Twitter" | "TikTok" | "Instagram";

export type blurb = {
  id: string;
  platform: Platform;
  text: string;
};

const GenerateBlurb = () => {
  const blurbs: blurb[] = [
    {
      id: "e1",
      platform: "Linkedin",
      text: "@TheInfluenceExpress \n \nHi, I'm The Influence Express, your go-to source for the latest in lifestyle, tech, and all things exciting! 🚀 With over 10 years in the field, I've worked with some of the biggest brands in the world 🌐 and TestBrand is no exception! My mission is to bring you the very best, and today I've got something really special. 😄 \n\nJoin the conversation at: https://fake-link-2.com!",
    },
    {
      id: "e2",
      platform: "Instagram",
      text: "🚀 Exciting news! We just launched emoji-ai the ultimate tool for Social Merida marketers. 🎉 Now you can easily generate promotional copies with emojis for each platform by simply dropping in an article or video link.🔗#EmojiAI #socialmedia #marketing #productlaunch",
    },
    {
      id: "e3",
      platform: "Twitter",
      text: "🎺Trumpet AI: Revolutionizing music education🎼! Your personal AI tutor🤖provides real-time feedback📈, personalized lessons📚. Dive into a vast library📖 of compositions. Unlock your potential!🏆",
    },
    {
      id: "e4",
      platform: "TikTok",
      text: "Learning trumpet🎺? Meet #TrumpetAI🚀! This AI coach🤖 slays with on-point feedback🎯, custom lessons🎼, & epic music library📚. Get ready to rule the music scene🌟. #TrumpetGlowUp #MusicTikTok",
    },
  ];

  return (
    <>
      <section className="main">
        <Sidebar>
          <TextGenerationForm />
        </Sidebar>

        <ViewBoard>
          <DraggableAndDroppable blurbs={blurbs} />
        </ViewBoard>
      </section>
    </>
  );
};

export default GenerateBlurb;
