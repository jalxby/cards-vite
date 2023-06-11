import React, { FC, useState } from "react";
import s from "@/features/packs/PacksTable.module.scss";
import { useSortColumn } from "@/common/utils/useSortColumn.ts";
import { CurrentSorted } from "@/features/packs/PacksTable.tsx";

type PropsType = {
  title: string;
};

export enum SortDirection {
  ASCENDING = 0,
  DESCENDING = 1,
}

export const ColumnHeader: FC<PropsType> = ({ title }) => {
  const [_, sortDirection, setSort] = useSortColumn();
  const [isVisible, setIsVisible] = useState(false);
  const sortDirectionIcon =
    sortDirection === SortDirection.ASCENDING
      ? `${s.ascending}`
      : sortDirection === SortDirection.DESCENDING
      ? `${s.descending}`
      : `${s.neutral}`;

  return (
    <span
      style={{ display: "flex", alignItems: "center", gap: 3 }}
      onClick={() => setSort(CurrentSorted[title])}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div>{title}</div>
      {isVisible && <div className={sortDirectionIcon}></div>}
    </span>
  );
};
