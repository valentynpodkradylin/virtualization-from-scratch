import { FC, useCallback, useRef, useState } from "react";

import { useFixedSizeList } from "./useFixedSizeList";

/*
Фичи:
- только горизонтальная виртуализация
- фиксированный размер элементов
- overscan
- isScrolling
*/

interface Item {
  id: string;
  text: string;
}

const createItems = (): Item[] => {
  return Array.from({ length: 10_000 }, (_, index) => ({
    id: Math.random().toString(36).slice(2),
    text: String(index),
  }));
};

const itemHeight = 40;
const containerHeight = 600;

export const Simple: FC = () => {
  const [listItems, setListItems] = useState(createItems());
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const { isScrolling, totalListHeight, virtualItemsList } = useFixedSizeList({
    itemHeight: itemHeight,
    listHeight: containerHeight,
    itemsCount: listItems.length,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
  });

  return (
    <div style={{ padding: "0 12px" }}>
      <h1>List</h1>
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setListItems((items) => items.slice().reverse())}
        >
          reverse
        </button>
      </div>
      <div
        ref={scrollElementRef}
        style={{
          overflow: "auto",
          position: "relative",
          height: containerHeight,
          border: "1px solid lightgray",
        }}
      >
        <div style={{ height: totalListHeight }}>
          {virtualItemsList.map((virtualItem) => {
            const item = listItems[virtualItem.index];

            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  top: 0,
                  transform: `translateY(${virtualItem.offsetTop}px)`,
                  height: itemHeight,
                  padding: "6px 12px",
                }}
              >
                {isScrolling ? "Loading..." : item.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
