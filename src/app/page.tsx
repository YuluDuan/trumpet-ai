import LandingPageHeader from "@/components/LandingPage/LandingPageHeader/LandingPageHeader";
import Image from "next/image";
import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getUsers() {
  return db.user.findMany().catch(() => {
    throw new Error("failed to fetch users");
  });
}

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    const user = await clerkClient.users.getUser(userId);
    redirect("/generate-blurb");
  }
  return (
    <section className="main-content-landing">
      <LandingPageHeader />
      <div className="main-part">
        <div className="teaser">
          <p>
            Write the Best Marketing Brief for Your Content within One Click
          </p>
          <Image
            src="/assets/eye.gif"
            height={95.584}
            width={95.584}
            alt="eye gif"
            className="git-image"
          />
        </div>
        <Link href="/sign-in" className="free-trial">
          Start Free Trail
        </Link>
      </div>
    </section>
  );
}
