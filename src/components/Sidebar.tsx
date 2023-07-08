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
          <h2 className="title">Trumpet.ai</h2>
          <img className="avatar" src={Avatar.src}></img>
        </div>
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
        <div className="form">{children}</div>
      </section>
    </>
  );
};

export default Sidebar;
