"use client";

import Modal from "./UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { previewModalActions } from "../store/previewSlice";
import { RootState } from "../store";
import LinkedinPreview from "./UI/Linkedin/LinkedinPreview";
import LinkedinMobile from "./UI/Linkedin/Mobile/LinkedinMobile";
import TwitterPreview from "./UI/Twitter/TwitterPreview";
import InstagramPreview from "./UI/Instagram/InstagramPreview";
import InstagramMobile from "./UI/Instagram/Mobile/InstagramMobile";
import TikTokPreview from "./UI/TikTok/TikTokPreview";
import TwitterMobile from "./UI/Twitter/Mobile/TwitterMobile";
import TikTokMobile from "./UI/TikTok/Mobile/TikTokMobile";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

// Component mapping
const PRIVIEW_COMPONENTS = {
  LinkedIn: {
    mobile: LinkedinMobile,
    web: LinkedinPreview,
  },
  Twitter: {
    mobile: TwitterMobile,
    web: TwitterPreview,
  },
  Instagram: {
    mobile: InstagramMobile,
    web: InstagramPreview,
  },
  TikTok: {
    mobile: TikTokMobile,
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

  if (!blurbData?.blurb) return null;

  // Get the specific component using the platform name
  const PreviewComponent =
    PRIVIEW_COMPONENTS[blurbData.platform][selectedButton];

  // Get the initialSlide index
  const initialSlide = blurbData.allBlurbs.findIndex(
    ({ id }) => id === blurbData.blurb.id
  );
  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(previewModalActions.onCloseModal())}
      platform={blurbData.platform}
      selectedButton={selectedButton}
    >
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        initialSlide={initialSlide}
      >
        {blurbData.allBlurbs &&
          blurbData.allBlurbs.map((blurb) => (
            <SwiperSlide key={`slide-${blurb.id}`}>
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
                        dispatch(
                          previewModalActions.onChangeSelectedButton("mobile")
                        )
                      }
                    >
                      Mobile
                    </button>
                    <button
                      type="button"
                      className={selectedButton === "web" ? "selected" : ""}
                      onClick={() =>
                        dispatch(
                          previewModalActions.onChangeSelectedButton("web")
                        )
                      }
                    >
                      Web
                    </button>
                  </div>
                </div>

                <div
                  className={`preview-content ${
                    selectedButton === "mobile" ||
                    blurbData.platform === "TikTok" ||
                    blurbData.platform === "Instagram"
                      ? "no-border"
                      : ""
                  }`}
                >
                  <PreviewComponent textContent={blurb.content} />
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </Modal>
  );
};

export default PreviewModal;
