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
  if (items.length === 0)
    return (
      <div className="text-center text-white">
        {emptyMessage ?? "No items."}
      </div>
    );

  return items.map((item) => (
    <div key={keyExtractor(item)}>{renderItem(item)}</div>
  ));
};

export default List;
