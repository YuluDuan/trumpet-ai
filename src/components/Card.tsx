"use client";

import { MouseEventHandler, useRef, useState } from "react";
import { $getRoot, LexicalEditor } from "lexical";
import { PLATFORM_IMAGE, imageMatch } from "@/lib/utils";

import Editor from "./Editor";
import SortableList from "./DraggableAndDroppable/Sortable/SortableList";
import IconButton from "./UI/IconButton";
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
import { blurbsActions, selectBlurbById } from "@/store/blurbsSlice";

import { PLATFORM } from "@/types";
import { cardDropdownOptions, swapToFirst } from "@/lib/utils";
import { useVariantContext } from "@/context/VariantContext";
import { roboto } from "@/app/font";
import { UseCompletionHelpers } from "ai/react";
import { useBlurbGenerationContext } from "@/context/BlurbGenerationContext";
import { useAppSelector } from "@/store/provider";
import DropdownCard from "./UI/DropdownMenuUI/DropdownCard";

interface Props {
  blurbId: string;
}

const Card = ({ blurbId }: Props) => {
  const dispatch = useDispatch();

  const [iscopy, setIsCopy] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { numVariants, showVariants, handleShowVariants, setVariants } =
    useVariantContext();

  const blurb = useAppSelector((state) => selectBlurbById(state, blurbId));
  const platformVariantStatus = useAppSelector((state) => state.blurbs.platforms[blurb?.platformName as PLATFORM|| ''])

  const platformIcon = imageMatch(
    blurb?.platformName || "",
    PLATFORM_IMAGE
  ).src;

  const editorRef = useRef<LexicalEditor>();

  const { platformGenerationMap } = useBlurbGenerationContext();
  const { isLoading, completion } = (platformGenerationMap.get(
    blurb?.platformName as PLATFORM
  ) as UseCompletionHelpers) || { isLoading: true, completion: "" };

  // const DROPDOWN_OPTIONS = cardDropdownOptions(isVariantCard);
  const DROPDOWN_OPTIONS = cardDropdownOptions(false);

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
        blurbId,
      })
    );
  };

  // const handleSwapOnClick: MouseEventHandler<HTMLImageElement> = () => {
  //   setAllBlurbs(swapToFirst(allBlurbs, index));
  // };

  const handleDeleteOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(blurbsActions.deleteBlurbById({ ...blurb }));

      const newNumVariants = parseInt(numVariants, 10) - 1;
      if (isNaN(newNumVariants) || newNumVariants <= 0) {
        setVariants("");
      } else {
        setVariants(newNumVariants.toString());
      }
  };

  return (
      (blurb?.isVisible) && (
         <section className="card">
      {!blurb?.isVariant ? ( // isVariantCard
        <div className="icon_container">
          <div className="drag_handle">
            {/* show draghandle only when has no variants or fold all the variants */}
            {(numVariants !== "" && !showVariants && !platformVariantStatus.isLoading) || numVariants === "" ? (
              <SortableList.DragHandle />
            ) : null}

            <img src={platformIcon} className="icon" alt="Platfrom Icon" />
          </div>
          {numVariants != "" &&
            (showVariants && !platformVariantStatus.isLoading ? (
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
            // onClick={handleSwapOnClick}
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
            text={blurb?.isVariant? blurb.content: completion}
            ref={editorRef}
            onBlur={handleEditorOnBlur}
            onFocus={handleFocus}
          />
        )}

        {/* Bottom Actions  */}
        {
          (!blurb?.isVariant) && (
            <div className="dropdowns-container">
            {Object.keys(DROPDOWN_OPTIONS).map((label, index) => (
              <DropdownCard
                key={`DROPDOWN_OPTIONS-${index}`}
                dropDownLabel={label}
                menuItems={DROPDOWN_OPTIONS[label]}
                platform={blurb?.platformName || ""}
              />
            ))}
          </div>
          )
        }
      </WhiteCard>

      {/* RightHand Side Actions */}
      {!blurb?.isLoading && (
        <div className="basic_tool">
          <div className="copy">
            <IconButton onClick={handleCopyOnClick} icon={<MdContentCopy />} />
            {iscopy && <small className="success_text">Content copied</small>}
          </div>

          <IconButton
            onClick={handlePreviewOnClick}
            icon={<MdOutlineRemoveRedEye />}
          />

          <IconButton
            onClick={handleDeleteOnClick}
            icon={<RiDeleteBin6Line />}
          />
        </div>
      )}
    </section>
      )
  );
};

export default Card;
