"use client";

import Fold from "../../public/assets/fold.svg";
import Expand from "../../public/assets/expand.svg";
import { useState } from "react";
import Link from "next/link";

const Sidebar = ({
  children,
  profileImage,
}: {
  children: React.ReactNode;
  profileImage: string;
}) => {
  const [fold, setFold] = useState(false);
  return (
    <>
      <section className={fold ? "side-bar close" : "side-bar"}>
        <div className="logo">
          <p className="title">
            Trumpet.ai <span className="price-badge">Free Trial</span>
          </p>
          <Link href={"/user/default-setting/Instagram"}>
            <img className="avatar" src={profileImage} />
          </Link>
        </div>
        <div className="form">{children}</div>
        {fold ? (
          <img
            className="fold"
            src={Expand.src}
            onClick={() => setFold(!fold)}
          ></img>
        ) : (
          <img
            className="fold"
            src={Fold.src}
            onClick={() => setFold(!fold)}
          ></img>
        )}
      </section>
    </>
  );
};

export default Sidebar;
