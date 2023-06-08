import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectSort } from "@/features/packs/packs.selectors.ts";
import { packsActions } from "@/features/packs/packs.slice.ts";

export const useSortColumn = (column: string): [number | null, () => void] => {
  const getSort = useAppSelector<string | undefined>(selectSort);
  const dispatch = useAppDispatch();

  const nextSortDirection = () => {
    if (!getSort) {
      dispatch(
        packsActions.setQueryParams({
          params: { sortPacks: `0${column}` },
        })
      );
    } else if (getSort[0] === "0") {
      dispatch(
        packsActions.setQueryParams({
          params: { sortPacks: `1${column}` },
        })
      );
    } else if (getSort[0] === "1") {
      dispatch(
        packsActions.setQueryParams({
          params: { sortPacks: `` },
        })
      );
    }
  };

  return [getSort != null ? +getSort[0] : null, nextSortDirection];
};
