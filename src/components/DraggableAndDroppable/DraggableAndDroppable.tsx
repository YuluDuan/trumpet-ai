"use client";

import SortableList from "./Sortable/SortableList";

import { useEffect, useState } from "react";
import { Platform } from "@/types";

import { useSelector } from "react-redux";
import { selectSelectedPlatforms } from "@/store/platformSlice";
import CardsContainer from "../UI/CardsContainer/CardsContainer";
import { VariantContextProvider } from "@/context/VariantContext";

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
        renderItem={(platform) => (
          <SortableList.Item id={platform.id}>
            <VariantContextProvider>
              <CardsContainer platform={platform} />
            </VariantContextProvider>
          </SortableList.Item>
        )}
      />
    </>
  );
};

export default DraggableAndDroppable;
