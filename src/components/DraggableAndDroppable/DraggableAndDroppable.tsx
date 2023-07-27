"use client";
import { blurb } from "@/app/generate-blurb/page";
import { useState } from "react";
import SortableList from "./Sortable/SortableList";
import Card from "../Card";
import { imageMatch, PLATFORM_IMAGE } from "@/lib/utils";

interface Props {
  blurbs: blurb[];
}

const DraggableAndDroppable = ({ blurbs }: Props) => {
  const [items, setItems] = useState(blurbs);
  return (
    <>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <Card
              img={imageMatch(item.platform, PLATFORM_IMAGE).src}
              text={item.text}
              platform={item.platform}
            />
          </SortableList.Item>
        )}
      />
    </>
  );
};

export default DraggableAndDroppable;
