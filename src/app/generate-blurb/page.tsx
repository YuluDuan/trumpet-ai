import GenerateBlurb from "@/components/GenerateBlurb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export type Platform = "LinkedIn" | "Twitter" | "TikTok" | "Instagram";

export default async function GenerateBlurbPage() {
  const user = await currentUser();
  const isPro = await checkSubscription();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <GenerateBlurb profileImage={user!.imageUrl} isPro={isPro} />
    </>
  );
}
