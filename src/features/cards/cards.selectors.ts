import { createSelector } from "@reduxjs/toolkit";
import { formatDate } from "@/common/utils/formatDate.ts";
import { RootState } from "@/app/store.ts";

export const selectCards = (state: RootState) => state.cards.cardsData.cards;

const selectUserIdFromCards = (state: RootState) =>
  state.cards.cardsData.packUserId;

const selectUserIdFromAuth = (state: RootState) => state.auth.profile?._id;

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
