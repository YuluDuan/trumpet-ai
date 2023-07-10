"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { useEffect, useState } from "react";

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

const Editor = ({ text }: Props): JSX.Element | null => {
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
    nodes: [HeadingNode, ListNode, ListItemNode],
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
        <ToolbarPlugin />
        <div className="editor-inner">
          <ListPlugin />
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
