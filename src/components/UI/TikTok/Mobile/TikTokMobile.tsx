import Battery from "../../../../../public/assets/Battery.svg";
import Signal from "../../../../../public/assets/Mobile-Signal.svg";
import Wifi from "../../../../../public/assets/Wifi.svg";
import Disc from "../../../../../public/assets/disc.svg";

import Home from "../../../../../public/assets/Home.svg";
import Discover from "../../../../../public/assets/Search.svg";
import TikTokAdd from "../../../../../public/assets/tiktokAdd.svg";
import Inbox from "../../../../../public/assets/Inbox.svg";
import Me from "../../../../../public/assets/Account.svg";

import Image from "next/image";
import Avatar from "../../../../../public/assets/avatar4.jpg";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";

interface Props {
  textContent: string;
}

const TikTokMobile = ({ textContent }: Props) => {
  const displayedText =
    textContent.length > 68 ? textContent.slice(0, 68) : textContent;

  const moreText = textContent.length > 68 ? "...more" : "";
  return (
    <>
      <article className="tiktok-mobile-preview">
        <div className="mobile-content">
          <div className="content-top">
            <aside className="status-bar">
              <div className="status-time">9:41</div>
              <div className="status-icon">
                <Image
                  src={Signal}
                  width={15}
                  height={10}
                  alt="mobile signal"
                />
                <Image src={Wifi} width={15} height={10} alt="wifi" />
                <Image src={Battery} width={15} height={10} alt="battery" />
              </div>
            </aside>
            <div className="following-for">
              <span className="following">Following |</span>{" "}
              <span className="for-you">For You</span>
            </div>
          </div>

          <div className="content-bottom">
            <p className="tiktok-username">@user_name</p>
            <p className="tik-text-content">
              {displayedText} <span>{moreText}</span>
            </p>
          </div>

          <aside className="side-icons">
            <Image
              src={Avatar}
              className="avatar-tiktok-mobile"
              alt="avatar"
              width={40}
              height={40}
            />
            <span>
              <AiFillHeart /> 328k
            </span>
            <span>
              <FaCommentDots /> 578
            </span>
            <span>
              <PiShareFatFill />
              Share
            </span>
            <Image
              src={Disc}
              className="disc"
              alt="disc"
              width={40}
              height={40}
            />
          </aside>
        </div>

        <nav className="bottom-nav">
          <div className="bottom-div-icons">
            <span>
              <Image
                src={Home}
                className="home"
                alt="home"
                width={30}
                height={30}
              />
              Home
            </span>

            <span className="discover">
              <Image
                src={Discover}
                className="Discover"
                alt="Discover"
                width={30}
                height={30}
              />
              Discover
            </span>

            <span>
              <Image
                src={TikTokAdd}
                className="add"
                alt="add"
                width={43}
                height={28}
              />
            </span>

            <span>
              <Image
                src={Inbox}
                className="Inbox"
                alt="Inbox"
                width={30}
                height={30}
              />
              Inbox
            </span>

            <span className="me-span">
              <Image src={Me} className="me" alt="me" width={30} height={30} />
              Me
            </span>
          </div>

          <div className="line"></div>
        </nav>
      </article>
    </>
  );
};

export default TikTokMobile;
