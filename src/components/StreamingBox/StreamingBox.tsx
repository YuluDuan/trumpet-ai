"use client";

import { BlurbRequest } from "@/types";
import { useCompletion } from "ai/react";
import { useEffect } from "react";

export default function StreamingBox(props: {
  platformName: string;
  blurbRequest: BlurbRequest;
}) {
  const { completion, complete } = useCompletion({
    api: `/api/completion/${props.platformName || "LinkedIn"}`,
    body: {
      blurbRequest: props.blurbRequest || {
        brandName: "hi",
        theme: "",
        description: "",
        links: "",
        targetAudience: "",
        includeEmojis: true,
        includeHashtags: true,
      },
    },
  });

  useEffect(() => {
    complete("");
  }, []);

  return <output>{completion}</output>;
}
