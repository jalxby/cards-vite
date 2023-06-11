import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectSort } from "@/features/packs/packs.selectors.ts";
import { packsActions } from "@/features/packs/packs.slice.ts";

/**
 * Custom hook to handle sorting column in the component.
 * @param {string} colName - The name of the column to be sorted as default.
 * @returns {Array} - [sorted column name, sort direction, function to update the sort direction]
 */
export const useSortColumn = (
  colName: string
): [string, number | null, (column: string) => void] => {
  const getSort = useAppSelector<string | undefined>(selectSort);
  const dispatch = useAppDispatch();
  const sortDirection = getSort ? +getSort[0] : 2;
  /**
   * Function to update the sort direction based on the specified column.
   * @param {string} column - The name of the column to update the sort direction.
   */
  const updateSortDirection = (column: string = colName) => {
    let sortPacks: string | undefined;
    if (!getSort) {
      sortPacks = `0${column.toLowerCase()}`;
    } else if (getSort[0] === "0") {
      sortPacks = `1${column.toLowerCase()}`;
    } else if (getSort[0] === "1") {
      sortPacks = "";
    }

    dispatch(packsActions.setQueryParams({ params: { sortPacks } }));
  };

  return [colName, sortDirection, updateSortDirection];
};
