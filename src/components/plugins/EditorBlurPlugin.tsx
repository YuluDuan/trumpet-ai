"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { BLUR_COMMAND, COMMAND_PRIORITY_EDITOR } from "lexical";
import { useEffect } from "react";

const EditorBlurPlugin = ({ onBlur }: { onBlur: () => void }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.registerCommand(
      BLUR_COMMAND,
      () => {
        console.log("test");
        onBlur();
        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, []);

  return null;
};

EditorBlurPlugin.displayName = "EditorBlurPlugin";
export default EditorBlurPlugin;
