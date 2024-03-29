"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

import React from "react";
import { useEffect, useState } from "react";
import EditorCapturePlugin from "./plugins/EditorCapturePlugin";
import EditorBlurPlugin from "./plugins/EditorBlurPlugin";

import { roboto } from "@/app/font";
import EditorFocusPlugin from "./plugins/EditorFocusPlugin";

interface Props {
  text: string;
  onBlur: () => void;
  onFocus: () => void;
}
const theme = {};

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

function onError(error: Error) {
  console.error(error);
}

const Editor = React.forwardRef(
  ({ text, onBlur, onFocus }: Props, ref): JSX.Element | null => {
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
              contentEditable={
                <ContentEditable
                  className={`${roboto.className} editor-input`}
                />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <EditorCapturePlugin ref={ref} />
            <HistoryPlugin />
            <EditorBlurPlugin onBlur={onBlur} />
            <EditorFocusPlugin onFocus={onFocus} />
          </div>
        </div>
      </LexicalComposer>
    );
  }
);

Editor.displayName = "Editor";
export default Editor;
