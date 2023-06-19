import { RootState } from "@/app/store.ts";
import { formatDate } from "@/common/utils/formatDate.ts";
import { createSelector } from "@reduxjs/toolkit";

export const selectCards = (state: RootState) => state.cards.cardsData.cards;
export const selectPackName = (state: RootState) =>
  state.cards.cardsData.packName;

const selectUserIdFromCards = (state: RootState) =>
  state.cards.cardsData.packUserId;

const selectUserIdFromAuth = (state: RootState) => state.auth.profile?._id;

export const selectCardsTotalCount = (state: RootState) =>
  state.cards.cardsData.cardsTotalCount;
export const selectCardsPageCount = (state: RootState) =>
  state.cards.cardsData.pageCount;
export const selectActivePage = (state: RootState) =>
  state.cards.cardsData.page;
export const selectItemsPerPageData = (state: RootState) =>
  state.cards.cardsPerPage;
export const selectTotalPages = createSelector(
  [selectCardsTotalCount, selectCardsPageCount],
  (totalCards, pageCount) => {
    return Math.ceil(totalCards / pageCount);
  }
);

export const selectIsMyPackSelected = createSelector(
  [selectUserIdFromCards, selectUserIdFromAuth],
  (cardsUserID, authUserID) => {
    return cardsUserID === authUserID;
  }
);

export const selectPacksFormatDate = createSelector([selectCards], (cards) => {
  return cards.map((card) => ({
    ...card,
    updated: formatDate(new Date(card.updated)),
  }));
});
