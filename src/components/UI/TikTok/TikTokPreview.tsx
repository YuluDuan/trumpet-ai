import ImagePlaceHodler from "../../../../public/assets/TikTokImagePlaceHolder.png";
import Message from "../../../../public/assets/Message.svg";
import Facebook from "../../../../public/assets/Facebook.svg";
import InstagramLogo from "../../../../public/assets/Instagram-Logo.svg";
import Whatsapp from "../../../../public/assets/WhatsApp-Logo.svg";
import AT from "../../../../public/assets/Ad-Sign.svg";
import Smile from "../../../../public/assets/smile-icon.svg";

import { HiDotsHorizontal, HiBookmark } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import { ImEmbed2 } from "react-icons/im";

import Avatar from "../../../../public/assets/avatar4.jpg";
import Image from "next/image";

interface Props {
  textContent: string;
}

const TikTokPreview = ({ textContent }: Props) => {
  const displayedText =
    textContent.length > 180 ? textContent.slice(0, 180) : textContent;
  const words = displayedText.split(/\s+|\n/);

  const moreText = textContent.length > 180 ? "...more" : "";
  return (
    <>
      <div className="post-card-container">
        <article className="post-card-article">
          <div className="post-card-body left">
            <div className="placehoderImage" style={{ position: "relative" }}>
              <img
                className="post-card-content"
                src={ImagePlaceHodler.src}
                alt="post"
              />
            </div>
          </div>

          <div className="desktop-right">
            <div className="bg-white">
              <div className="post-card-header flex-row">
                <header className="post-header-avatar flex-row">
                  <div className="align-items-center">
                    <Image
                      src={Avatar}
                      className="avatar-tiktok"
                      alt="avatar"
                      width={32}
                      height={32}
                    />
                    <h4 style={{ fontSize: "18px", lineHeight: "24px" }}>
                      User Name
                    </h4>
                  </div>
                </header>
                <span className="post--header--options">
                  <HiDotsHorizontal />
                </span>
              </div>

              <div className="post-content">
                <p>
                  {words.map((word, index) => {
                    if (word.startsWith("#")) {
                      return (
                        <>
                          <span className="hashtag">{word}</span>{" "}
                        </>
                      );
                    }
                    return word + " ";
                  })}
                  <span style={{ color: "grey" }}>{moreText}</span>
                </p>
              </div>

              <div className="post-tiktok-footer">
                <div className="footer-icons flex-row">
                  <div className="icon-flex-row left-icons">
                    <div className="icon-tiktok">
                      <div className="grey-circle">
                        <AiFillHeart />
                      </div>
                      <span>0</span>
                    </div>

                    <div className="icon-tiktok">
                      <div className="grey-circle">
                        <FaCommentDots />
                      </div>
                      <span>0</span>
                    </div>

                    <div className="icon-tiktok">
                      <div className="grey-circle">
                        <HiBookmark />
                      </div>
                      <span>0</span>
                    </div>
                  </div>

                  <div className="right-icons">
                    <div className="icon-flex-row">
                      <div className="with-circle">
                        <ImEmbed2 />
                      </div>
                      <Image
                        src={Message}
                        width={25}
                        height={25}
                        alt="message"
                      />
                      <Image
                        src={Whatsapp}
                        width={25}
                        height={25}
                        alt="Whatsapp"
                      />
                      <Image
                        src={Facebook}
                        width={25}
                        height={25}
                        alt="Facebook"
                      />
                      <Image
                        src={InstagramLogo}
                        width={25}
                        height={25}
                        alt="InstagramLogo"
                      />

                      <div className="share">
                        <PiShareFatFill />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="copy-link">
                  <button>
                    <strong>
                      <small>Copy Link </small>
                    </strong>
                  </button>
                </div>
              </div>
            </div>

            <div className="comment-section">
              <p>Be the first to comment!</p>
            </div>

            <div className="card-footer">
              <div className="input-container">
                <input
                  className="post__bottom__input"
                  type="text"
                  placeholder="Add a commment.."
                />
                <div className="input-icon">
                  <Image src={AT} width={25} height={25} alt="at" />
                  <Image src={Smile} width={25} height={25} alt="Smile" />
                </div>
              </div>

              <button type="submit" className="post__bottom__button">
                Post
              </button>
            </div>

            {/* the end of content*/}
          </div>
        </article>
      </div>
    </>
  );
};

export default TikTokPreview;
