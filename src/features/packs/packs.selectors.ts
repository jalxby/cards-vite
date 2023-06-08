import { RootState } from "@/app/store.ts";

export const selectTotalPacks = (state: RootState) =>
  state.packs.cardsData.cardPacksTotalCount;
export const selectPageCount = (state: RootState) =>
  state.packs.cardsData.pageCount;
export const selectQueryParams = (state: RootState) => state.packs.queryParams;
