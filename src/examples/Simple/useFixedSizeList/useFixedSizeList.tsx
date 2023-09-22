import { UseFixedSizeListProps, UseFixedSizeListReturnTypes } from "./types";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

export const DEFAULT_OVERSCAN = 3;
export const DEFAULT_SCROLLING_DELAY = 150;

export function useFixedSizeList(
  props: UseFixedSizeListProps
): UseFixedSizeListReturnTypes {
  const {
    itemHeight,
    itemsCount,
    listHeight,
    getScrollElement,
    overscan = DEFAULT_OVERSCAN,
    scrollingDelay = DEFAULT_SCROLLING_DELAY,
  } = props;

  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;
      setScrollTop(scrollTop);
    };

    handleScroll();

    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [getScrollElement]);

  useEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) {
      return;
    }

    let timeoutId: number | null = null;

    const handleScroll = () => {
      setIsScrolling(true);

      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, scrollingDelay);
    };

    scrollElement.addEventListener("scroll", handleScroll);
    return () => {
      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      }
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [getScrollElement, scrollingDelay]);

  const { virtualItemsList, endIndex, startIndex } = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + listHeight;

    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(itemsCount - 1, endIndex + overscan);

    const virtualItemsList = [];

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItemsList.push({
        index,
        offsetTop: index * itemHeight,
      });
    }

    return { virtualItemsList, startIndex, endIndex };
  }, [itemHeight, itemsCount, listHeight, overscan, scrollTop]);

  const totalListHeight = itemHeight * itemsCount;

  return {
    virtualItemsList,
    totalListHeight,
    startIndex,
    endIndex,
    isScrolling,
  };
}
