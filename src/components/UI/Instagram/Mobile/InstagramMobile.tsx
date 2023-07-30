import ImagePlaceHodler from "../../../../../public/assets/Rectangle.png";
import Avatar from "../../../../../public/assets/avatar4.jpg";
import Verified from "../../../../../public/assets/verified.svg";
import Image from "next/image";

import { FiMoreVertical, FiSend } from "react-icons/fi";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
interface Props {
  textContent: string;
}
const InstagramMobile = ({ textContent }: Props) => {
  const displayedText =
    textContent.length > 88 ? textContent.slice(0, 88) : textContent;

  const moreText = textContent.length > 88 ? "...more" : "";
  return (
    <>
      <div className="post-card">
        <div className="user-info">
          <div className="info">
            <div className="profile-pic">
              <Image src={Avatar} width={40} height={40} alt="avatar" />
            </div>
            <p style={{ marginRight: "5px" }} className="username">
              username
            </p>
            <Image src={Verified} width={13} height={13} alt="verified" />
          </div>
          <FiMoreVertical />
        </div>

        <Image
          src={ImagePlaceHodler}
          width={375}
          height={365}
          alt="placeholder image"
        />

        <div className="ins-icons-container">
          <div className="icon-flex-row">
            <FaRegHeart />
            <FaRegComment />
            <FiSend />
          </div>

          <div className="bookmark">
            <HiOutlineBookmark />
          </div>
        </div>

        <div className="post-details">
          <p className="likes-cnt">
            <span>157 likes</span>
          </p>

          <div className="caption-div">
            <span>
              <strong>username </strong>
            </span>
            {displayedText}
            <span style={{ color: "grey", fontWeight: "normal" }}>
              {moreText}
            </span>
          </div>
          <div className="post-time">3 days ago</div>
          <div className="view-all-cmt">View all 2,000 comments</div>
        </div>
      </div>
    </>
  );
};

export default InstagramMobile;
