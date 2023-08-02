"use client";

import { MouseEventHandler, useRef, useState } from "react";
import { $getRoot, LexicalEditor } from "lexical";

import { useDispatch } from "react-redux";
import { previewModalActions } from "../store/preview-slice";

import Editor from "./Editor";
import SortableList from "./DraggableAndDroppable/Sortable/SortableList";
import IconButton from "./UI/IconButton";
import DropdownMenuUI from "./UI/DropdownMenuUI/DropdownMenuUI";

import { MdOutlineModeEdit } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Platform } from "@/app/generate-blurb/page";

interface Props {
  img: string;
  text: string;
  platform: Platform;
}

interface DropdownMenuProps {
  selectedLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
  hasSubDropdown: boolean;
}

const DROPDOWN_OPTIONS: {
  [key: string]: (string | { subLabel: string; items: string[] })[];
} = {
  Variant: ["1", "2", "3"],
  Regenerate: ["Expand", "Shorten", "Rewrite"],
  "Tone : Professional": [
    "Professional",
    "Relaxed",
    "Catchy",
    "Humorous",
    "Enthusiastic",
    "Brief",
  ],
  "Update Emoji": [
    "More Emojis",
    "Less Emojis",
    {
      subLabel: "Change Vibe",
      items: ["Catchy", "Calm", "Emotional"],
    },
  ],
};

const generateDropdownProps = (label: string): DropdownMenuProps => {
  return {
    selectedLabel: label,
    menuItems: DROPDOWN_OPTIONS[label],
    hasSubDropdown: DROPDOWN_OPTIONS[label].some(
      (item) => typeof item === "object"
    ),
  };
};

const Card = ({ img, text, platform }: Props) => {
  const [iscopy, setIsCopy] = useState(false);
  const editorRef = useRef<LexicalEditor>();
  const dispatch = useDispatch();

  const getEditorContent = () => {
    if (editorRef.current !== undefined) {
      if (editorRef.current !== null) {
        const editorState: LexicalEditor = editorRef.current;
        const latestEditorState = editorState.getEditorState();
        const textContent = latestEditorState.read(() =>
          $getRoot().getTextContent()
        );

        // console.log(textContent);
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
        platform: platform,
        img: img,
      })
    );
  };

  return (
    <section className="card">
      <div className="icon_container">
        <img src={img} className="icon" alt="Platfrom Icon" />
        <SortableList.DragHandle />
      </div>

      <div className="white-card-container">
        <Editor text={text} ref={editorRef} />

        {/* Bottom Actions  */}
        <div className="dropdowns-container">
          {Object.keys(DROPDOWN_OPTIONS).map((label, index) => (
            <DropdownMenuUI key={index} {...generateDropdownProps(label)} />
          ))}
        </div>
      </div>

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
