import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlurbRequest, Blurb, blurbsSchema } from "@/types";
import { createSelector } from "reselect";
import { RootState } from "@/store/index";

export const addNewBlurbs = createAsyncThunk(
  'blurbRequests/addNewBlurbs',

  async ({blurbRequest, platformIds}: {blurbRequest: BlurbRequest, platformIds:number[]}) => {
    // const response = await fetch("/api/blurb-requests" ,{
    //   method: 'POST',
    //   body: JSON.stringify({blurbRequest, platformIds})
    // });

    const stubResponse: Blurb[] = [
      {
        "id": 70,
        "content": "🎙️ Introducing \"The Breakdown | Product and Entrepreneurship\" podcast by P@CMU! 🚀\n\nLooking to make the most of your summer internship? 🌞💼 We've got your back! Tune in to our latest episode where we break down all the tips and tricks you need to know for a successful internship experience! 💪\n\n🎯 From setting expectations to networking like a pro and maximizing your skills, we've got you covered on all bases. 📈 Get ready to level up your intern game and make your mark in the industry! 💼✨\n\nJoin us now on Spotify and YouTube to gain valuable insights and make this summer your most fruitful one yet! 🔥 Don't miss out on this opportunity to learn from the best and skyrocket your career. 🚀\n\n✨📎 Spotify: [insert Spotify CTA link]\n✨🎥 YouTube: [insert YouTube CTA link]\n\nGet ready to turn your summer internship into a game-changing learning experience! 🌟💼\n#TheBreakdownPodcast #ProductAndEntrepreneurship #InternshipTips #SummerInternshipSuccess #CareerBoost #NetworkingLikeAPro #MaximizeYourSkills #LevelUpYourInternGame #P@CMU #PodcastRecommendation",
        "blurbRequestId": 28,
        "platformId": 1
      },
      {
        "id": 69,
        "content": "🎧 Exciting news! Check out the latest episode of \"The breakdown | Product and Entrepreneurship\" by P@CMU. 🔥 \nTheme: How to make the most of your summer internship 🌞\nTopics covered: Setting expectations, Networking, Maximizing your experience 💼\n🔽 Tune in on Spotify: [link] 🎙️\nWatch on Youtube: [link] 🎥\n\n#Podcast #ProductEnthusiast #InternshipTips #MaximizeExperience #Networking101 #SummerInternship 🎉",
        "blurbRequestId": 28,
        "platformId": 2
      },
      {
        "id": 71,
        "content": "🎙️ Hey TikTok fam! Are you ready to level up your summer internship game? 🌞💼\n\nIntroducing \"The breakdown | Product and Entrepreneurship\" podcast by P@CMU! 🎧 In this episode, we are spilling all the tea on how to make the MOST of your summer internship. 🔥\n\n📅 Setting expectations: Learn how to set clear goals and objectives for your internship experience. It's time to make every moment count!\n\n🤝 Networking 101: Discover insider tips on how to effectively network during your internship. Connect with professionals, expand your circle, and open doors for future opportunities. 🌐\n\n💼 Maximize your experience: Tune in to find out expert strategies to make the most out of your internship. From gaining valuable skills to making an impact, we've got you covered! 💪\n\nSo, what are you waiting for? 🚀 Join us on Spotify and YouTube to unlock the secrets of a successful summer internship! 📲🎶\n\n👉 Spotify: [Insert Spotify link here]\n👉 YouTube: [Insert YouTube link here]\n\nDon't miss out on this incredible opportunity to level up your career game! 🎉👨‍💼 Use the hashtags #InternshipSuccess and #P@CMUBreakdown to join the conversation and share your own internship journey.\n\nTap that follow button and tune in to \"The breakdown | Product and Entrepreneurship\" for some major intern inspo! 👌✨ Let's make this summer count! 💪🌟 #SummerInternship #CareerTips #ProfessionalGrowth #InternshipGoals #P@CMU",
        "blurbRequestId": 28,
        "platformId": 3
      },
      
      
      {
        "id": 72,
        "content" : "@TheInfluenceExpress \n\nHi, I'm The Influence Express, your go-to source for the latest in lifestyle, tech, and all things exciting! 🚀 With over 10 years in the field, I've worked with some of the biggest brands in the world 🌐 and TestBrand is no exception! \n\nJoin the conversation at: https://fake-link-2.com!",
        "blurbRequestId": 28,
        "platformId": 4
      },
      {
        "id": 73,
        "content" : "Ins: 🚀 Exciting news! We just launched emoji-ai the ultimate tool for Social Merida marketers. 🎉 Now you can easily generate promotional copies with emojis for each platform by simply dropping in an article or video link.🔗 #EmojiAI #socialmedia #marketing #productlaunch",
        "blurbRequestId": 28,
        "platformId": 1
      },
      {
        "id": 74,
        "content" : "Ins: 🎺Trumpet AI: Revolutionizing music education🎼! Your personal AI tutor🤖provides real-time feedback📈, personalized lessons📚. Dive into a vast library📖 of compositions. Unlock your potential!🏆",
        "blurbRequestId": 28,
        "platformId": 1
      },
      {
        "id": 78,
        "content" : "Ins: 🎺Trumpet AI: Revolutionizing music education🎼! Your personal AI tutor🤖provides real-time feedback📈, personalized lessons📚. Dive into a vast library📖 of compositions. Unlock your potential!🏆 \n \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum pharetra vulputate. Aliquam placerat vehicula metus, non tincidunt felis aliquet sit amet. Donec in felis eu ligula mattis gravida id quis ipsum. Sed vehicula consequat ligula porta dictum. Phasellus vestibulum, magna ac tempor sodales, neque felis rutrum tortor, eget placerat turpis diam ac lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum pharetra vulputate. Aliquam placerat vehicula metus, non tincidunt felis aliquet sit amet. Donec in felis eu ligula mattis gravida id quis ipsum. Sed vehicula consequat ligula porta dictum. Phasellus vestibulum, magna ac tempor sodales, neque felis rutrum tortor, eget placerat turpis diam ac lectus.",
        "blurbRequestId": 28,
        "platformId": 1
      },
      {
        "id": 79,
        "content" : "LinkedIn: Learning trumpet🎺? Meet #TrumpetAI🚀! This AI coach🤖 slays with on-point feedback🎯, custom lessons🎼, & epic music library📚. Get ready to rule the music scene🌟. #TrumpetGlowUp #MusicTikTok",
        "blurbRequestId": 28,
        "platformId": 4
      }


    ]
    return stubResponse;
  }
)

const initialState = {
  blurbs: [] as Blurb[],
  status: 'idle',
  error: null
}

const blurbs = createSlice({
  name: 'blurbs',
  initialState: initialState,
  reducers: {
    updateBlurbContentById:(state, action) => {
      const oldBlurb = state.blurbs.find(blurb => blurb.id === action.payload.id);
      if (oldBlurb) {
        oldBlurb.content = action.payload.content;
    }
    },

    deleteBlurbById:(state, action) => {
        state.blurbs = state.blurbs.filter(blurb => blurb.id !== action.payload.id);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addNewBlurbs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addNewBlurbs.fulfilled, (state, action) => {
        const blurbs = blurbsSchema.parse(action.payload);
        state.status = 'succeeded'
        state.blurbs = [...state.blurbs, ...blurbs];
      })
  }
});

export const selectAllBlurbs = (state: RootState) => state.blurbs.blurbs;

export const selectBlurbById = createSelector(
  [selectAllBlurbs, (state, blurbId) => blurbId],
  (blurbs, blurbId) => blurbs.find(blurb => blurb.id === blurbId)
)
export const selectAllBlurbsByPlatformId = createSelector(
  [selectAllBlurbs, (state, platformId) => platformId],
  (blurbs, platformId) => blurbs.filter(blurb => blurb.platformId === platformId)
)
export const selectFirstBlurbByPlatformId = createSelector(
  [selectAllBlurbsByPlatformId],
  (blurbs) => blurbs[0]
  )
export const selectNBlurbsByPlatformId = createSelector(
  [selectAllBlurbsByPlatformId, (state, platformId, n) => n],
  (blurbs, n) => blurbs.slice(1, 1+n)
)

export const selectFirstBlurbByPlatformIds = (state: RootState, platformIds: number[]) => {
  return platformIds.map((platformId) => state.blurbs.blurbs.find((blurb) => blurb.platformId === platformId));
}
export const blurbsActions = blurbs.actions;
export default blurbs.reducer;