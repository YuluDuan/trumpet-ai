import React, { createContext, useContext, useMemo } from "react";
import type { PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: UniqueIdentifier;
}

// create context for DragHandle use in the case DragHandle is not a direct child of SortableItem
interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

const SortableItem = ({ children, id }: PropsWithChildren<Props>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    opacity: isDragging ? 0.4 : undefined, // set style of the not overlaied copy
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
};

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  return (
    <button className="DragHandle" {...attributes} {...listeners} ref={ref}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="21"
        viewBox="0 0 12 21"
        fill="none"
      >
        <path
          d="M1.63428 20.5091C1.19445 20.5091 0.81212 20.346 0.487286 20.0197C0.162428 19.6935 0 19.3104 0 18.8706C0 18.4308 0.163125 18.0485 0.489378 17.7236C0.815606 17.3988 1.19863 17.2363 1.63846 17.2363C2.07828 17.2363 2.46061 17.3995 2.78545 17.7257C3.1103 18.052 3.27273 18.435 3.27273 18.8748C3.27273 19.3146 3.10961 19.697 2.78335 20.0218C2.45713 20.3466 2.0741 20.5091 1.63428 20.5091ZM10.3615 20.5091C9.92172 20.5091 9.53939 20.346 9.21455 20.0197C8.88969 19.6935 8.72726 19.3104 8.72726 18.8706C8.72726 18.4308 8.89039 18.0485 9.21664 17.7236C9.54287 17.3988 9.9259 17.2363 10.3657 17.2363C10.8055 17.2363 11.1879 17.3995 11.5127 17.7257C11.8376 18.052 12 18.435 12 18.8748C12 19.3146 11.8369 19.697 11.5106 20.0218C11.1844 20.3466 10.8014 20.5091 10.3615 20.5091ZM1.63428 11.8909C1.19445 11.8909 0.81212 11.7278 0.487286 11.4015C0.162428 11.0753 0 10.6923 0 10.2524C0 9.81262 0.163125 9.43029 0.489378 9.10546C0.815606 8.7806 1.19863 8.61817 1.63846 8.61817C2.07828 8.61817 2.46061 8.7813 2.78545 9.10755C3.1103 9.43378 3.27273 9.81681 3.27273 10.2566C3.27273 10.6965 3.10961 11.0788 2.78335 11.4036C2.45713 11.7285 2.0741 11.8909 1.63428 11.8909ZM10.3615 11.8909C9.92172 11.8909 9.53939 11.7278 9.21455 11.4015C8.88969 11.0753 8.72726 10.6923 8.72726 10.2524C8.72726 9.81262 8.89039 9.43029 9.21664 9.10546C9.54287 8.7806 9.9259 8.61817 10.3657 8.61817C10.8055 8.61817 11.1879 8.7813 11.5127 9.10755C11.8376 9.43378 12 9.81681 12 10.2566C12 10.6965 11.8369 11.0788 11.5106 11.4036C11.1844 11.7285 10.8014 11.8909 10.3615 11.8909ZM1.63428 3.27273C1.19445 3.27273 0.81212 3.10961 0.487286 2.78336C0.162428 2.45713 0 2.0741 0 1.63428C0 1.19445 0.163125 0.812121 0.489378 0.487287C0.815606 0.16243 1.19863 0 1.63846 0C2.07828 0 2.46061 0.163128 2.78545 0.48938C3.1103 0.815608 3.27273 1.19863 3.27273 1.63846C3.27273 2.07828 3.10961 2.46061 2.78335 2.78545C2.45713 3.11031 2.0741 3.27273 1.63428 3.27273ZM10.3615 3.27273C9.92172 3.27273 9.53939 3.10961 9.21455 2.78336C8.88969 2.45713 8.72726 2.0741 8.72726 1.63428C8.72726 1.19445 8.89039 0.812121 9.21664 0.487287C9.54287 0.16243 9.9259 0 10.3657 0C10.8055 0 11.1879 0.163128 11.5127 0.48938C11.8376 0.815608 12 1.19863 12 1.63846C12 2.07828 11.8369 2.46061 11.5106 2.78545C11.1844 3.11031 10.8014 3.27273 10.3615 3.27273Z"
          fill="black"
        />
      </svg>
    </button>
  );
}

export default SortableItem;
