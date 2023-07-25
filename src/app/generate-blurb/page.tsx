import ViewBoard from "@/components/ViewBoard";
import Sidebar from "@/components/Sidebar";
import TextGenerationForm from "@/components/TextGenerationForm";
import DraggableAndDroppable from "@/components/DraggableAndDroppable/DraggableAndDroppable";

export type Platform = "Linkedin" | "Twitter" | "Tiktok" | "Instagram";

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
      text: "🎺 Calling all marketers! Are you tired of spending hours sifting through data to create compelling marketing campaigns? Look no further than Trumpet AI, the game-changing platform that will revolutionize your marketing strategy. 📈Gone are the days of manual analysis and guesswork. Trumpet AI uses advanced algorithms to analyze customer behavior, identify trends, and generate personalized marketing campaigns that speak directly to your target audience. 🎯With Trumpet AI, you can say goodbye to wasted resources on ineffective campaigns and hello to increased conversion rates and higher ROI. 🚀Don't let your competitors steal the spotlight. Join the growing number of businesses who are already leveraging the power of Trumpet AI to gain a competitive edge in the market. 🌟Ready to take your marketing to new heights? Click the link below to learn more about how Trumpet AI can transform your marketing efforts and propel your business forward. 👇#TrumpetAI #MarketingRevolution #AIpoweredMarketing",
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
      platform: "Tiktok",
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
