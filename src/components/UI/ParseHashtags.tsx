import React from "react";

export default function ParseHashtags({
  text,
  platform,
}: {
  text: string;
  platform: string;
}) {
  // Regular expression to split by words and preserve spaces/tabs
  const regex = /(\s+|\S+)/g;

  const lines = text.split("\n").map((line, lineIndex) => {
    // If line is empty, render a <br /> for the empty line
    if (!line) {
      return <br key={lineIndex} />;
    }

    const words = [];
    let match;

    while ((match = regex.exec(line)) !== null) {
      const word = match[0];

      if (word.startsWith("#")) {
        words.push(
          <span key={word + match.index} className={`hashtag-${platform}`}>
            {word}
          </span>
        );
      } else {
        words.push(word);
      }
    }

    // Return each line wrapped in a div to maintain line breaks
    return <div key={lineIndex}>{words}</div>;
  });

  return <>{lines}</>;
}
