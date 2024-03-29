"use client";

import SortableList from "./Sortable/SortableList";
import CardsContainer from "../UI/CardsContainer/CardsContainer";

import { useEffect, useState } from "react";
import { Platform } from "@/types";

import { useSelector } from "react-redux";
import { selectSelectedPlatforms } from "@/store/platformSlice";

import { VariantContextProvider } from "@/context/VariantContext";

const DraggableAndDroppable = () => {
  const [isMounted, setIsMounted] = useState(false);
  const platforms = useSelector(selectSelectedPlatforms) as Platform[];
  const [items, setItems] = useState(platforms);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setItems(platforms);
  }, [platforms]);

  if (!isMounted) return null;

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
