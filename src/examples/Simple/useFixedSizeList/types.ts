export interface UseFixedSizeListProps {
  itemsCount: number;
  itemHeight: number;
  listHeight: number;
  overscan?: number;
  scrollingDelay?: number;
  getScrollElement: () => HTMLElement | null;
}

export interface UseFixedSizeListReturnTypes {
  virtualItemsList: {
    index: number;
    offsetTop: number;
  }[];
  totalListHeight: number;
  startIndex: number;
  endIndex: number;
  isScrolling: boolean;
}

export type UseFixedSizeList = (
  props: UseFixedSizeListProps
) => UseFixedSizeListReturnTypes;
