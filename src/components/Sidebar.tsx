"use client";

import TextGenerationForm from "./TextGenerationForm";
import Avatar from "@/assets/avatar4.jpg";
import Fold from "@/assets/fold.svg";
import Expand from "@/assets/expand.svg";
import { useState } from "react";

interface Props {
  img: string;
}

const Sidebar = ({ img }: Props) => {
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
        <div className="form">
          <TextGenerationForm />
        </div>
      </section>
    </>
  );
};

export default Sidebar;
