import { createURL } from "@/lib/api";
import { BlurbRequest } from "@/types";

export async function createBlurbRequest(blurbRequest: BlurbRequest) {
  const res = await fetch(
    new Request(createURL("/api/blurbRequest"), {
      method: "POST",
      body: JSON.stringify({ blurbRequest }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}
