import React, { FC, useState } from "react";
import s from "@/features/columnHeader/ColumnHeader.module.scss";
import { useSortColumn } from "@/common/utils/useSortColumn.ts";
import { CurrentSorted } from "@/features/packs/packsTable/PacksTable.tsx";

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
      className={s.span}
      onClick={() => setSort(CurrentSorted[title])}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div>{title}</div>
      {isVisible && <div className={sortDirectionIcon}></div>}
    </span>
  );
};
