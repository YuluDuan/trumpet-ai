"use client";

import { MouseEventHandler, useRef, useState } from "react";
import { $getRoot, LexicalEditor } from "lexical";

import Editor from "./Editor";
import SortableList from "./DraggableAndDroppable/Sortable/SortableList";
import IconButton from "./UI/IconButton";
import DropdownMenuUI from "./UI/DropdownMenuUI/DropdownMenuUI";
import WhiteCard from "./UI/WhiteCard/WhiteCard";

import { MdOutlineModeEdit } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { useDispatch } from "react-redux";
import { previewModalActions } from "../store/previewSlice";

import { Platform } from "@/types";
import { cardDropdownOptions } from "@/lib/utils";

interface Props {
  img: string;
  text: string;
  platform: Platform;
  isVariantCard: boolean;
}

const Card = ({ img, text, platform, isVariantCard }: Props) => {
  const [iscopy, setIsCopy] = useState(false);
  const editorRef = useRef<LexicalEditor>();
  const dispatch = useDispatch();

  const DROPDOWN_OPTIONS = cardDropdownOptions(isVariantCard);

  const getEditorContent = () => {
    if (editorRef.current !== undefined) {
      if (editorRef.current !== null) {
        const editorState: LexicalEditor = editorRef.current;
        const latestEditorState = editorState.getEditorState();
        const textContent = latestEditorState.read(() =>
          $getRoot().getTextContent()
        );

        return textContent;
      }
    }

    return "";
  };

  const handleCopyOnClick = async () => {
    //Copy the editor text to clipboard
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(getEditorContent());
        setIsCopy(true);
        setTimeout(() => {
          setIsCopy(false);
        }, 1500);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditOnClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handlePreviewOnClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    dispatch(
      previewModalActions.onOpenModal({
        textContent: getEditorContent(),
        platform: platform.name,
        img: img,
      })
    );
  };

  return (
    <section className="card">
      {!isVariantCard && (
        <div className="icon_container">
          <img src={img} className="icon" alt="Platfrom Icon" />
          <SortableList.DragHandle />
        </div>
      )}

      <WhiteCard>
        <Editor text={text} ref={editorRef} />

        {/* Bottom Actions  */}
        <div className="dropdowns-container">
          {Object.keys(DROPDOWN_OPTIONS).map((label, index) => (
            <DropdownMenuUI
              key={`DROPDOWN_OPTIONS-${index}`}
              dropDownLabel={label}
              menuItems={DROPDOWN_OPTIONS[label]}
            />
          ))}
        </div>
      </WhiteCard>

      {/* RightHand Side Actions */}
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
