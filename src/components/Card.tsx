
"use client";

import { useRef } from "react";
import Editor from "./Editor";
import { $getRoot, LexicalEditor } from "lexical";
import Copy from "../../public/assets/copy.svg";


interface Props {
  img: string;
  text: string;
}

const Card = ({ img, text }: Props) => {
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
      <button onClick={handleOnClick}>Copy</button>
    </section>
  );
};

export default Card;
