import type { ReactNode } from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
};

const List = <T,>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage,
}: ListProps<T>) => {
  if (items.length === 0) return <div>{emptyMessage ?? "No items."}</div>;

  return items.map((item) => (
    <div
      className="w-full
        md:w-[calc(33.333%-0.5rem)]
        xl:w-[calc(20%-0.667rem)]"
      key={keyExtractor(item)}
    >
      {renderItem(item)}
    </div>
  ));
};

export default List;
