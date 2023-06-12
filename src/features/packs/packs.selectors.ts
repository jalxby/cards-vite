import { RootState } from "@/app/store.ts";
import { createSelector } from "@reduxjs/toolkit";
import { formatDate } from "@/common/utils/formatDate.ts";

export const selectTotalPacks = (state: RootState) =>
  state.packs.packsData.cardPacksTotalCount;
export const selectPageCount = (state: RootState) =>
  state.packs.packsData.pageCount;
export const selectQueryParams = (state: RootState) => state.packs.queryParams;
export const selectPacks = (state: RootState) =>
  state.packs.packsData.cardPacks;
export const selectSort = (state: RootState) =>
  state.packs.queryParams.sortPacks;
export const selectPackTitle = (state: RootState) => (id: string) =>
  state.packs.packsData.cardPacks.filter((pack) => pack._id === id)[0].name;
export const selectIsPrivate = (state: RootState) => (id: string) =>
  state.packs.packsData.cardPacks.filter((pack) => pack._id === id)[0].private;

export const selectPacksFormatDate = createSelector([selectPacks], (packs) => {
  return packs.map((pack) => ({
    ...pack,
    updated: formatDate(new Date(pack.updated)),
  }));
});
