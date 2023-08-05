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

import { useDispatch, useSelector } from "react-redux";
import { previewModalActions } from "../store/previewSlice";

import { selectFirstBlurbByPlatformId } from "@/store/blurbsSlice";
import { RootState } from "@/store";
import { Platform } from "@/types";

interface Props {
  img: string;
  platform: Platform;
}

interface DropdownMenuProps {
  dropDownLabel: string;
  menuItems: (string | { subLabel: string; items: string[] })[];
}

const DROPDOWN_OPTIONS: {
  [key: string]: (string | { subLabel: string; items: string[] })[];
} = {
  Variants: ["1", "2", "3"],
  Regenerate: ["Expand", "Shorten", "Rewrite"],
  Tone: [
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
    dropDownLabel: label,
    menuItems: DROPDOWN_OPTIONS[label],
  };
};

const Card = ({ img, platform }: Props) => {
  const [iscopy, setIsCopy] = useState(false);
  const editorRef = useRef<LexicalEditor>();
  const dispatch = useDispatch();

  const blurb = useSelector((state: RootState) =>
    selectFirstBlurbByPlatformId(state, platform.id)
  );
  console.log("blurb", blurb);

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
        platform: platform.name,
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

      <WhiteCard>
        {blurb && <Editor text={blurb.content} ref={editorRef} />}

        {/* Bottom Actions  */}
        <div className="dropdowns-container">
          {Object.keys(DROPDOWN_OPTIONS).map((label, index) => (
            <DropdownMenuUI
              key={`DROPDOWN_OPTIONS-${index}`}
              {...generateDropdownProps(label)}
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
