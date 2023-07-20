"use client";
import Ins from "../../../public/assets/ins.svg";
import Linkedin from "../../../public/assets/linkedin.svg";
import Twitter from "../../../public/assets/twitter.svg";
import Tiktok from "../../../public/assets/tiktok.png";

import { blurb } from "@/app/generate-blurb/page";
import { useState } from "react";
import SortableList from "./Sortable/SortableList";
import Card from "../Card";

interface Props {
  blurbs: blurb[];
}

const imageMatch = (platform: string) => {
  switch (platform) {
    case "Linkedin":
      return Linkedin;
    case "Ins":
      return Ins;
    case "Twitter":
      return Twitter;
    case "Tiktok":
      return Tiktok;
    default:
      return null;
  }
};

const DraggableAndDroppable = ({ blurbs }: Props) => {
  const [items, setItems] = useState(blurbs);
  return (
    <>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <Card img={imageMatch(item.platform)?.src} text={item.text} />
          </SortableList.Item>
        )}
      />
    </>
  );
};

export default DraggableAndDroppable;
