"use client";

import Avatar from "../../public/assets/avatar4.jpg";
import Fold from "../../public/assets/fold.svg";
import Expand from "../../public/assets/expand.svg";
import { useState } from "react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [fold, setFold] = useState(false);
  return (
    <>
      <section className={fold ? "side-bar close" : "side-bar"}>
        <div className="logo">
          <p className="title">Trumpet.ai</p>
          <img className="avatar" src={Avatar.src}></img>
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
