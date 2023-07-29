import ImagePlaceHodler from "../../../../public/assets/TikTokImagePlaceHolder.png";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsBookmarkFill, BsEmojiSmile } from "react-icons/bs";

import Avatar from "../../../../public/assets/avatar4.jpg";
import Image from "next/image";

interface Props {
  textContent: string;
}

const TikTokPreview = ({ textContent }: Props) => {
  return (
    <>
      <div id="post" className="post--card--container">
        <article className="post--card--article">
          <div className="post--card--body desktop--left">
            <div className="placehoderImage" style={{ position: "relative" }}>
              <img
                className="post__card__content"
                src={ImagePlaceHodler.src}
                alt="post"
              />
            </div>
          </div>

          <div className="desktop--right">
            <div className="post--card--header flex-row">
              <header className="post--header--avatar flex-row">
                <div className="align-items-center">
                  <Image
                    src={Avatar}
                    className="post__header__avatar"
                    alt="avatar"
                    width={32}
                    height={32}
                  />
                  <h4>User Name</h4>
                </div>
              </header>
              <span className="post--header--options">
                <HiDotsHorizontal />
              </span>
            </div>

            <div className="post-content">
              <p>{textContent}</p>
            </div>

            <div className="post--card--footer flex-column">
              <div className="post--footer--upper--row flex-row">
                <div className="icon-flex-row">
                  <AiOutlineHeart />
                  <FaRegComment />
                </div>

                <div className="bookmark__icon">
                  <BsBookmarkFill />
                </div>
              </div>
              <p className="like__invitation">
                Be the first to <strong>like this</strong>{" "}
              </p>

              <small className="post__date">11 SECONDS AGO</small>

              <form className="post--bottom--comment--adding flex-row">
                <div className="form--input--container flex-row">
                  <div className="form--input--container--inner flex-row">
                    <BsEmojiSmile />
                    <input
                      className="post__bottom__input"
                      type="text"
                      placeholder="Add a commment.."
                      spellCheck="true"
                    />
                  </div>
                </div>

                <button type="submit" className="post__bottom__button">
                  Post
                </button>
              </form>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default TikTokPreview;
