"use client";

import SortableList from "./Sortable/SortableList";
import Card from "../Card";

import { useEffect, useState } from "react";
import { imageMatch, PLATFORM_IMAGE } from "@/lib/utils";

import { useSelector } from "react-redux";
import { selectSelectedPlatforms } from "@/store/platformSlice";
import { Platform } from "@/types";

const DraggableAndDroppable = () => {
  const platforms = useSelector(selectSelectedPlatforms) as Platform[];
  const [items, setItems] = useState(platforms);

  useEffect(() => {
    setItems(platforms);
  }, [platforms]);

  return (
    <>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <Card
              img={imageMatch(item.name, PLATFORM_IMAGE).src}
              platform={item}
            />
          </SortableList.Item>
        )}
      />
    </>
  );
};

export default DraggableAndDroppable;
