"use client";

import Modal from "./UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { previewModalActions } from "../store/preview-slice";
import { RootState } from "../store";
import { useState } from "react";
import LinkedinPreview from "./UI/Linkedin/LinkedinPreview";
import TwitterPreview from "./UI/Twitter/TwitterPreview";

const PreviewModal = () => {
  const [selectedButton, setSelectedButton] = useState("Web");
  const { isOpen, data: blurbData } = useSelector(
    (state: RootState) => state.preview
  );
  const dispatch = useDispatch();

  if (!blurbData?.textContent || blurbData?.textContent === "") {
    return null;
  }
  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(previewModalActions.onCloseModal())}
    >
      <div className="modal-content">
        <div className="modal-title">
          <div className="modal-platform">
            <img src={blurbData.img} />
            <span>{blurbData.platform}</span>
          </div>

          <div className="button-group" role="group">
            <button
              type="button"
              className={selectedButton === "Mobile" ? "selected" : ""}
              onClick={() => setSelectedButton("Mobile")}
            >
              Mobile
            </button>
            <button
              type="button"
              className={selectedButton === "Web" ? "selected" : ""}
              onClick={() => setSelectedButton("Web")}
            >
              Web
            </button>
          </div>
        </div>

        <div className="preview-content">
          <LinkedinPreview textContent={blurbData.textContent} />
          {/* <TwitterPreview textContent={blurbData.textContent} /> */}
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
