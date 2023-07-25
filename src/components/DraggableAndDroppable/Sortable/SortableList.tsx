"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem, { DragHandle } from "./SortableItem";
import SortableOverlay from "./SortableOverlay";
import React from "react";

interface BasicItem {
  id: UniqueIdentifier;
}

// generics make the props work with different types of data
interface Props<T extends BasicItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
}

const SortableList = <T extends BasicItem>({
  items,
  onChange,
  renderItem,
}: Props<T>) => {
  const [active, setActive] = useState<Active | null>(null);

  // useMemo is used here to avoid performing the search on every render
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActive(active)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActive(null)}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
        ))}
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);

      onChange(arrayMove(items, activeIndex, overIndex));
    }
    setActive(null);
  }
};

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
export default SortableList;
