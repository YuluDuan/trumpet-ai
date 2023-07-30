"use client";

import Modal from "./UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { previewModalActions } from "../store/preview-slice";
import { RootState } from "../store";
import LinkedinPreview from "./UI/Linkedin/LinkedinPreview";
import TwitterPreview from "./UI/Twitter/TwitterPreview";
import InstagramPreview from "./UI/Instagram/InstagramPreview";
import InstagramMobile from "./UI/Instagram/Mobile/InstagramMobile";
import TikTokPreview from "./UI/TikTok/TikTokPreview";

// Component mapping
const PRIVIEW_COMPONENTS = {
  Linkedin: {
    mobile: InstagramMobile,
    web: LinkedinPreview,
  },
  Twitter: {
    mobile: InstagramMobile,
    web: TwitterPreview,
  },
  Instagram: {
    mobile: InstagramMobile,
    web: InstagramPreview,
  },
  TikTok: {
    mobile: InstagramMobile,
    web: TikTokPreview,
  },
};

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

  // Get the specific component using the platform name
  const PreviewComponent =
    PRIVIEW_COMPONENTS[blurbData.platform][selectedButton];

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

        <div
          className={`preview-content ${
            blurbData.platform === "TikTok" ||
            blurbData.platform === "Instagram"
              ? "no-border"
              : ""
          }`}
        >
          <PreviewComponent textContent={blurbData.textContent} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
