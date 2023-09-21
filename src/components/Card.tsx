"use client";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
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

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { useDispatch } from "react-redux";
import { previewModalActions } from "../store/previewSlice";
import { blurbsActions } from "@/store/blurbsSlice";

import { Blurb, PLATFORM, Platform } from "@/types";
import { cardDropdownOptions, swapToFirst } from "@/lib/utils";
import { useVariantContext } from "@/context/VariantContext";
import { roboto } from "@/app/font";
import { UseCompletionHelpers } from "ai/react";
import { useBlurbGenerationContext } from "@/context/BlurbGenerationContext";

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
  const [isFocused, setIsFocused] = useState(false);
  const { numVariants, showVariants, handleShowVariants, setVariants } =
    useVariantContext();
  const editorRef = useRef<LexicalEditor>();
  const dispatch = useDispatch();
  const {platformGenerationMap} = useBlurbGenerationContext();
  const {isLoading, completion} = platformGenerationMap.get(platform.name as PLATFORM) as UseCompletionHelpers;

  const DROPDOWN_OPTIONS = cardDropdownOptions(isVariantCard);

  const handleFocus = () => {
    setIsFocused(true);
  };

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

  // update blurb content after editing
  const handleEditorOnBlur = () => {
    dispatch(
      blurbsActions.updateBlurbContentById({
        ...blurb,
        content: getEditorContent(),
      })
    );
    setIsFocused(false);
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

  const handleDeleteOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(blurbsActions.deleteBlurbById({ ...blurb, platform }));

    const newNumVariants = parseInt(numVariants, 10) - 1;
    if (isNaN(newNumVariants) || newNumVariants <= 0) {
      setVariants("");
    } else {
      setVariants(newNumVariants.toString());
    }
  };

  return (
    <section className="card">
      {!isVariantCard ? (
        <div className="icon_container">
          <div className="drag_handle">
            {/* show draghandle only when has no variants or fold all the variants */}
            {(numVariants !== "" && !showVariants) || numVariants === "" ? (
              <SortableList.DragHandle />
            ) : null}

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

      <WhiteCard isFocused={isFocused}>
       {isLoading ? (
          <output
            className={`${roboto.className} whitespace-pre-wrap editor-input`}
          >
            {completion}
          </output>
        ) : (
          <Editor
            text={completion}
            ref={editorRef}
            onBlur={handleEditorOnBlur}
            onFocus={handleFocus}
          />
        )}

        {/* Bottom Actions  */}
        <div className="dropdowns-container">
          {Object.keys(DROPDOWN_OPTIONS).map((label, index) => (
            <DropdownMenuUI
              key={`DROPDOWN_OPTIONS-${index}`}
              dropDownLabel={label}
              menuItems={DROPDOWN_OPTIONS[label]}
              platform={platform.name}
            />
          ))}
        </div>
      </WhiteCard>

      {/* RightHand Side Actions */}
      <div className="basic_tool">
        <div className="copy">
          <IconButton onClick={handleCopyOnClick} icon={<MdContentCopy />}/>
          {iscopy && <small className="success_text">Content copied</small>}
        </div>

        <IconButton
          onClick={handlePreviewOnClick}
          icon={<MdOutlineRemoveRedEye />}
        />

        <IconButton onClick={handleDeleteOnClick} icon={<RiDeleteBin6Line />} />
      </div>
    </section>
  );
};

export default Card;
