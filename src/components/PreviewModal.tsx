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
import { roboto } from "@/app/font";
import { useAppSelector } from "@/store/provider";
import { selectAllBlurbs, selectAllVisibleMainBlurbs, selectBlurbById } from "@/store/blurbsSlice";
import { PLATFORM_IMAGE, imageMatch } from "@/lib/utils";
import { PLATFORM } from "@/types";

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

const PreviewComponent = (props: {platformName: PLATFORM, selectedButton: 'web' | 'mobile', textContent: string}) => {
  const ComponentToRender = PRIVIEW_COMPONENTS[props.platformName][props.selectedButton];
  return <ComponentToRender textContent={props.textContent} />;
}

const PreviewModal = () => {
  const {
    isOpen,
    blurbId,
    selectedButton,
  } = useSelector((state: RootState) => state.preview);

  const dispatch = useDispatch();

  const blurb = useAppSelector(state => selectBlurbById(state, blurbId));
  const allBlurbs = useAppSelector(state => selectAllVisibleMainBlurbs(state));

  return (
    blurb && (
    <Modal
      open={isOpen}
      onClose={() => dispatch(previewModalActions.onCloseModal())}
      platform={blurb.platformName}
      selectedButton={selectedButton}
    >
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        initialSlide={allBlurbs.findIndex(({ id }) => id === blurb?.id)}
      >
        {allBlurbs &&
          allBlurbs.map((blurb) => (
            <SwiperSlide key={`slide-${blurb.id}`}>
              <div className="modal-content">
                <div className="modal-title">
                  <div className="modal-platform">
                    <img src={imageMatch(blurb.platformName, PLATFORM_IMAGE).src} />
                    <span>{blurb.platformName}</span>
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
                    blurb.platformName === "TikTok" ||
                    blurb.platformName === "Instagram"
                      ? "no-border"
                      : ""
                  } ${roboto.className}`}
                >
                  <PreviewComponent platformName={blurb.platformName} selectedButton={selectedButton} textContent={blurb.content} />
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </Modal>
  )
  );
};

export default PreviewModal;
