import Avatar from "../../../../../public/assets/avatar4.jpg";
import ImagePlaceHodler from "../../../../../public/assets/Image-place-holder.png";
import { SlLike } from "react-icons/sl";
import { MdOutlineComment } from "react-icons/md";
import { BiRepost } from "react-icons/bi";
import { IoIosSend, IoIosMore } from "react-icons/io";

interface Props {
  textContent: string;
}
const LinkedinMobile = ({ textContent }: Props) => {
  const displayedText =
    textContent.length > 161 ? textContent.slice(0, 161) : textContent;

  const words = displayedText.split(/\s+|\n/);

  const moreText = textContent.length > 161 ? "...see more" : "";
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
          <p id="post-translation">
            <button>See translation</button>
          </p>
          <img src={ImagePlaceHodler.src} alt="image placeholder" />
        </div>
        <div id="post-interactions">
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

export default LinkedinMobile;
