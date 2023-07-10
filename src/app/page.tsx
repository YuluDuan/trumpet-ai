import DragandDrop from "@/components/DragandDrop";
import Editor from "@/components/Editor";

import { db } from "@/lib/db";

async function getUsers() {
  return db.user.findMany().catch(() => {
    throw new Error("failed to fetch users");
  });
}

export default async function Home() {
  const users = await getUsers();
  return (
    <>
      <p>{JSON.stringify(users)}</p>
      <DragandDrop />
    </>
  );
}
