"use client";

import Modal from "./UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { previewModalActions } from "../store/preview-slice";
import { RootState } from "../store";
import LinkedinPreview from "./UI/Linkedin/LinkedinPreview";
import TwitterPreview from "./UI/Twitter/TwitterPreview";
import InstagramPreview from "./UI/Instagram/InstagramPreview";
import TikTokPreview from "./UI/TikTok/TikTokPreview";

const PreviewModal = () => {
  const {
    isOpen,
    data: blurbData,
    selectedButton,
  } = useSelector((state: RootState) => state.preview);
  const dispatch = useDispatch();

  if (!blurbData?.textContent || blurbData?.textContent === "") {
    return null;
  }
  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(previewModalActions.onCloseModal())}
      platform={blurbData.platform}
      selectedButton={selectedButton}
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
              className={selectedButton === "mobile" ? "selected" : ""}
              onClick={() =>
                dispatch(previewModalActions.onChangeSelectedButton("mobile"))
              }
            >
              Mobile
            </button>
            <button
              type="button"
              className={selectedButton === "web" ? "selected" : ""}
              onClick={() =>
                dispatch(previewModalActions.onChangeSelectedButton("web"))
              }
            >
              Web
            </button>
          </div>
        </div>

        <div className="preview-content">
          {blurbData.platform === "Linkedin" && (
            <LinkedinPreview textContent={blurbData.textContent} />
          )}
          {blurbData.platform === "Twitter" && (
            <TwitterPreview textContent={blurbData.textContent} />
          )}

          {blurbData.platform === "Instagram" && (
            <InstagramPreview textContent={blurbData.textContent} />
          )}

          {blurbData.platform === "TikTok" && (
            <TikTokPreview textContent={blurbData.textContent} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
