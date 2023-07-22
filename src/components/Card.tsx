"use client";

import { useRef, useState } from "react";
import { $getRoot, LexicalEditor } from "lexical";

import Editor from "./Editor";
import SortableList from "./DraggableAndDroppable/Sortable/SortableList";
import IconButton from "./UI/IconButton";

import { MdOutlineModeEdit } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface Props {
  img: string;
  text: string;
}

const Card = ({ img, text }: Props) => {
  const [iscopy, setIsCopy] = useState(false);
  const editorRef = useRef<LexicalEditor>();

  const handleCopyOnClick = async () => {
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

  const handleEditOnClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handlePreviewOnClick = () => {};

  return (
    <section className="card">
      <div className="icon_container">
        <img src={img} className="icon" alt="Platfrom Icon" />
        <SortableList.DragHandle />
      </div>
      <Editor text={text} ref={editorRef} />

      {/* Actions */}
      <div className="basic_tool">
        <IconButton onClick={handleEditOnClick} icon={<MdOutlineModeEdit />} />
        <div className="copy">
          <IconButton onClick={handleCopyOnClick} icon={<MdContentCopy />} />
          {iscopy && <small className="success_text">Content copied</small>}
        </div>
        <IconButton
          onClick={handlePreviewOnClick}
          icon={<MdOutlineRemoveRedEye />}
        />
      </div>
    </section>
  );
};

export default Card;
