"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_EDITOR, FOCUS_COMMAND } from "lexical";
import { useEffect } from "react";

const EditorFocusPlugin = ({ onFocus }: { onFocus: () => void }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.registerCommand(
      FOCUS_COMMAND,
      () => {
        onFocus();
        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, []);

  return null;
};

EditorFocusPlugin.displayName = "EditorFocusPlugin";
export default EditorFocusPlugin;
