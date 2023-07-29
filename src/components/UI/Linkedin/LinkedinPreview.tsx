import Avatar from "../../../../public/assets/avatar4.jpg";
import ImagePlaceHodler from "../../../../public/assets/Image-place-holder.png";
import { SlLike } from "react-icons/sl";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";
import { BiRepost } from "react-icons/bi";
import { IoIosSend, IoIosMore } from "react-icons/io";

interface Props {
  textContent: string;
}
const LinkedinPreview = ({ textContent }: Props) => {
  const displayedText =
    textContent.length > 200 ? textContent.slice(0, 200) : textContent;

  const moreText = textContent.length > 200 ? "...see more" : "";
  return (
    <>
      <article>
        <div id="post-author">
          <a href="#">
            <div>
              <img src={Avatar.src} alt="" />
              <div>
                <div>
                  <strong id="post-author-name">Charlotte Hardy</strong>
                  <span>
                    <span>&nbsp;·&nbsp;</span>
                    1st
                  </span>
                </div>
                <span>Web Developer at Muse Software</span>
                <span>12h</span>
              </div>
            </div>
          </a>
          <div>
            <IoIosMore
              style={{
                width: "26px",
                height: "26px",
              }}
            />
          </div>
        </div>
        <div id="post-data">
          <p>
            {displayedText} <span style={{ color: "grey" }}>{moreText}</span>
          </p>
          <p id="post-translation">
            <button>See translation</button>
          </p>
          <img src={ImagePlaceHodler.src} alt="" />
        </div>
        <div id="post-interactions">
          <div id="interactions-amount">
            <span
              id="like-icon"
              className="fas fa-thumbs-up fa-flip-horizontal"
            >
              <SlLike style={{ transform: "scaleX(-1)" }} />
            </span>
            <span id="heart-icon" className="fas fa-heart">
              <AiOutlineHeart />
            </span>
            <span id="amount-info">
              23 <span>&nbsp;·&nbsp;</span> 4 Comments
            </span>
          </div>
          <div id="interactions-btns">
            <button>
              <span className="far fa-thumbs-up fa-flip-horizontal">
                <SlLike
                  style={{
                    transform: "scaleX(-1)",
                    width: "26px",
                    height: "26px",
                  }}
                />
              </span>
              <span>Like</span>
            </button>
            <button>
              <span className="far fa-comment-dots fa-flip-horizontal">
                <MdOutlineComment
                  style={{
                    width: "26px",
                    height: "26px",
                  }}
                />
              </span>
              <span>Comment</span>
            </button>
            <button>
              <span className="far fa-share-square">
                <BiRepost
                  style={{
                    width: "26px",
                    height: "26px",
                  }}
                />
              </span>
              <span>Repost</span>
            </button>
            <button>
              <span className="far fa-share-square">
                <IoIosSend
                  style={{
                    width: "26px",
                    height: "26px",
                  }}
                />
              </span>
              <span>Send</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default LinkedinPreview;
