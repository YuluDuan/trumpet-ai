"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { useEffect, useState } from "react";

import React from "react";
import EditorCapturePlugin from "./plugins/EditorCapturePlugin";

interface Props {
  text: string;
}
const theme = {};

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

function onError(error: Error) {
  console.error(error);
}

const Editor = React.forwardRef(({ text }: Props, ref): JSX.Element | null => {
  // create the prepopulated text
  function prepopulatedRichText(text: string) {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode(text));
      root.append(paragraph);
    }
  }

  const initialConfig = {
    namespace: "TextGenerationCard",
    theme,
    onError,
    editorState: () => prepopulatedRichText(text),
  };

  // using useEffect to run on the client only to prevent a hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <PlainTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <EditorCapturePlugin ref={ref} />
          <HistoryPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
});

Editor.displayName = "Editor";
export default Editor;
