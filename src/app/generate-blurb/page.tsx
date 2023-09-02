import GenerateBlurb from "@/components/GenerateBlurb";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export type Platform = "LinkedIn" | "Twitter" | "TikTok" | "Instagram";

export default async function GenerateBlurbPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <GenerateBlurb profileImage={user!.imageUrl} />
    </>
  );
}
