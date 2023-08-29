"use client";

import Avatar from "../../public/assets/avatar2.png";
import Fold from "../../public/assets/fold.svg";
import Expand from "../../public/assets/expand.svg";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [fold, setFold] = useState(false);
  return (
    <>
      <section className={fold ? "side-bar close" : "side-bar"}>
        <div className="logo">
          <p className="title">Trumpet.ai</p>
          <Link href={"/user/default-setting/Instagram"}>
            <Image
              className="avatar"
              src={Avatar}
              height={40}
              width={40}
              alt="avatar"
            />
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
