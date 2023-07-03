"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const DragandDrop = () => {
  const [text, setText] = useState([
    "I am a text for Instagram",
    "I am a text for Ticktok",
    "I am a text for Linkedin",
    "I am a text for Tweeter",
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over!.id) {
      setText((text) => {
        const activeIndex = text.indexOf(active.id.toString());
        const overIndex = text.indexOf(over!.id.toString());
        return arrayMove(text, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <h3>The Dragable & Dropable TextGenerationCard</h3>
      <SortableContext items={text} strategy={verticalListSortingStrategy}>
        {text.map((text) => (
          <SortableItem key={text} id={text} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DragandDrop;
