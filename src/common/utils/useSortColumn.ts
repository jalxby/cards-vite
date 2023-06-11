import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectSort } from "@/features/packs/packs.selectors.ts";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { useState } from "react";

type SortDirection = 0 | 1 | "";

export const useSortColumn = (): [
  string,
  SortDirection,
  (column: string) => void
] => {
  const getSort = useAppSelector<string | undefined>(selectSort);
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("");
  const dispatch = useAppDispatch();

  const updateSortDirection = (column: string) => {
    setSortedColumn(column);
    const directionMap: Record<string, SortDirection> = {
      "": 0,
      "0": 1,
      "1": "",
    };
    const newSortDirection = getSort ? directionMap[getSort[0]] : 0;
    setSortDirection(newSortDirection);
    let sortPacks = `${newSortDirection}${column}`;
    if (newSortDirection === "") {
      sortPacks = "";
    }
    dispatch(packsActions.setQueryParams({ params: { sortPacks } }));
  };

  return [sortedColumn, sortDirection, updateSortDirection];
};
