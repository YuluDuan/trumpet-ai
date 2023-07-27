import Avatar from "../../../../public/assets/avatar4.jpg";
import ImagePlaceHodler from "../../../../public/assets/Image-place-holder.png";
import Conversation from "../../../../public/assets/Conversation.svg";
import Retweet from "../../../../public/assets/Retweet.svg";
import Like from "../../../../public/assets/Like.svg";
import Share from "../../../../public/assets/Share.svg";
import Image from "next/image";

interface Props {
  textContent: string;
}
const TwitterPreview = ({ textContent }: Props) => {
  return (
    <div className="post">
      <div className="post_profile-image">
        <img src={Avatar.src} alt="avatar" />
      </div>
      <div className="post_body">
        <div className="post_header">
          <div className="post_header-text">
            <h3>
              Website name here
              <span className="header-icon-section">
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Verified"
                    d="M21.001 11.5C21.001 9.92 20.126 8.55 18.853 7.9C19.007 7.465 19.091 6.995 19.091 6.5C19.091 4.29 17.381 2.502 15.273 2.502C14.803 2.502 14.353 2.586 13.937 2.752C13.319 1.415 12.011 0.5 10.501 0.5C8.991 0.5 7.685 1.417 7.064 2.75C6.649 2.585 6.198 2.5 5.728 2.5C3.618 2.5 1.91 4.29 1.91 6.5C1.91 6.994 1.993 7.464 2.147 7.9C0.875 8.55 0 9.918 0 11.5C0 12.995 0.782 14.298 1.942 14.986C1.922 15.156 1.91 15.326 1.91 15.5C1.91 17.71 3.618 19.5 5.728 19.5C6.198 19.5 6.648 19.414 7.063 19.25C7.683 20.584 8.989 21.5 10.5 21.5C12.012 21.5 13.318 20.584 13.937 19.25C14.352 19.413 14.802 19.498 15.273 19.498C17.383 19.498 19.091 17.708 19.091 15.498C19.091 15.324 19.079 15.154 19.058 14.985C20.216 14.298 21.001 12.995 21.001 11.501V11.5ZM14.385 8.166L10.051 14.666C9.906 14.883 9.669 15 9.426 15C9.283 15 9.138 14.96 9.01 14.874L8.895 14.78L6.48 12.365C6.187 12.072 6.187 11.597 6.48 11.305C6.773 11.013 7.248 11.011 7.54 11.305L9.31 13.072L13.135 7.332C13.365 6.987 13.831 6.896 14.175 7.125C14.521 7.355 14.615 7.821 14.385 8.165V8.166Z"
                    fill="#1D9BF0"
                  />
                </svg>
                @twitter <span>&nbsp;·&nbsp;</span> 4h
              </span>
            </h3>
          </div>

          <div className="post_header-discription">
            <p>{textContent}</p>
          </div>
        </div>
        <img src={ImagePlaceHodler.src} alt="placeholder image" />

        <div className="post_footer">
          <Image src={Conversation} height={24} width={24} alt="comment" />
          <Image src={Retweet} height={24} width={24} alt="retweet" />
          <Image src={Like} height={24} width={24} alt="like" />
          <Image src={Share} height={24} width={24} alt="share" />
        </div>
      </div>
    </div>
  );
};

export default TwitterPreview;
