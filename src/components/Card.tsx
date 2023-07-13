"use client";

import { useRef, useState } from "react";
import Editor from "./Editor";
import { $getRoot, LexicalEditor } from "lexical";
import { MdContentCopy } from "react-icons/md";

interface Props {
  img: string;
  text: string;
}

const Card = ({ img, text }: Props) => {
  // Copy Button
  const [iscopy, setIsCopy] = useState(false);
  const editorRef = useRef();
  const handleOnClick = async () => {
    //Get Editor State
    if (editorRef.current !== undefined) {
      if (editorRef.current !== null) {
        const editorState: LexicalEditor = editorRef.current;
        const latestEditorState = editorState.getEditorState();
        const textContent = latestEditorState.read(() =>
          $getRoot().getTextContent()
        );

        console.log(textContent);

        //Copy the editor text to clipboard
        try {
          if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(textContent);
            setIsCopy(true);
            setTimeout(() => {
              setIsCopy(false);
            }, 1500);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  return (
    <section className="card">
      <img src={img} className="icon" />
      <Editor text={text} ref={editorRef} />
      <div className="basic_tool">
        <button onClick={handleOnClick} className="tool_btn">
          <MdContentCopy />
        </button>
      </div>

      {iscopy && <p className="success_text">Content copied</p>}
    </section>
  );
};

export default Card;
