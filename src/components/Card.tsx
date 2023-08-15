"use client";

import { MouseEventHandler, useRef, useState } from "react";
import { $getRoot, LexicalEditor } from "lexical";

import Editor from "./Editor";
import SortableList from "./DraggableAndDroppable/Sortable/SortableList";
import IconButton from "./UI/IconButton";
import DropdownMenuUI from "./UI/DropdownMenuUI/DropdownMenuUI";
import WhiteCard from "./UI/WhiteCard/WhiteCard";
import Image from "next/image";
import FoldVar from "../../public/assets/variants-fold.svg";
import ExpandVar from "../../public/assets/variants-expand.svg";
import UpVar from "../../public/assets/variants-up.svg";

import { MdOutlineModeEdit } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { useDispatch } from "react-redux";
import { previewModalActions } from "../store/previewSlice";
import { blurbsActions } from "@/store/blurbsSlice";

import { Blurb, Platform } from "@/types";
import { cardDropdownOptions, swapToFirst } from "@/lib/utils";
import { useVariantContext } from "@/context/VariantContext";

interface Props {
  img: string;
  blurb: Blurb;
  platform: Platform;
  isVariantCard: boolean;
  index: number;
  setAllBlurbs: (value: Blurb[]) => void;
  allBlurbs: Blurb[];
}

const Card = ({
  img,
  blurb,
  platform,
  isVariantCard,
  index,
  setAllBlurbs,
  allBlurbs,
}: Props) => {
  const [iscopy, setIsCopy] = useState(false);
  const { numVariants, showVariants, handleShowVariants } = useVariantContext();
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

  // update blurb content after editing
  const handleEditorOnBlur = () => {
    dispatch(
      blurbsActions.updateBlurbContentById({
        ...blurb,
        content: getEditorContent(),
      })
    );
  };

  const handlePreviewOnClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    dispatch(
      previewModalActions.onOpenModal({
        blurb: blurb,
        platform: platform.name,
        img: img,
        allBlurbs: allBlurbs,
      })
    );
  };

  const handleSwapOnClick: MouseEventHandler<HTMLImageElement> = () => {
    setAllBlurbs(swapToFirst(allBlurbs, index));
  };

  return (
    <section className="card">
      {!isVariantCard ? (
        <div className="icon_container">
          <div className="drag_handle">
            <SortableList.DragHandle />
            <img src={img} className="icon" alt="Platfrom Icon" />
          </div>
          {numVariants != "" &&
            (showVariants ? (
              <>
                <div className="dashed-border"></div>
                <Image
                  src={FoldVar}
                  width={25}
                  height={25}
                  alt="show variants"
                  className="variants-icon"
                  onClick={handleShowVariants}
                />
              </>
            ) : (
              <Image
                src={ExpandVar}
                width={25}
                height={25}
                alt="show variants"
                className="variants-icon"
                onClick={handleShowVariants}
              />
            ))}
        </div>
      ) : (
        <div className="icon_container">
          <div className="dashed-border up"></div>
          <Image
            src={UpVar}
            width={25}
            height={25}
            alt="show variants"
            className="variants-icon"
            onClick={handleSwapOnClick}
          />
        </div>
      )}

      <WhiteCard>
        <Editor
          text={blurb.content}
          ref={editorRef}
          onBlur={handleEditorOnBlur}
        />

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
