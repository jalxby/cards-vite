import { instance } from "@/common/api/common.api.ts";

export const cardsApi = {
  getCards() {
    return instance.get("cards/card");
  },
  createCard() {},
  updateCard() {},
  deleteCard() {},
  gradeCard() {},
};
