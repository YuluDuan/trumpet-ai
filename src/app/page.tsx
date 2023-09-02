import LandingPageHeader from "@/components/LandingPage/LandingPageHeader/LandingPageHeader";
import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";

async function getUsers() {
  return db.user.findMany().catch(() => {
    throw new Error("failed to fetch users");
  });
}

export default async function Home() {
  const users = await getUsers();

  const { userId } = auth();

  if (userId) {
    const user = await clerkClient.users.getUser(userId);
  }
  return (
    <>
      <LandingPageHeader />
    </>
  );
}
