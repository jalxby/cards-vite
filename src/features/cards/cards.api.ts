import { instance } from "@/common/api/common.api.ts";

export const cardsApi = {
  getCards(params?: CardsQueryParamsType) {
    return instance.get<GetCardsResponseType>("cards/card", { params: params });
  },
  createCard(params: CreateCardParamsType) {
    return instance.post<CreateCardResponseType>("cards/card", {
      card: params,
    });
  },
  updateCard(params: CreateCardParamsType) {
    return instance.put<UpdatedCardResponseType>("cards/card", {
      card: params,
    });
  },
  deleteCard(card_id: string) {
    return instance.delete<DeletedCardResponseType>(`cards/card?id=${card_id}`);
  },
  gradeCard() {},
};

export type CardsQueryParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id?: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: Date;
  updated: Date;
  __v: number;
};

export type GetCardsResponseType = {
  cards: CardType[];
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packCreated: Date;
  packUpdated: Date;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};

type CreateCardParamsType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: URL | Base64<`jpeg`>;
  questionImg?: URL | Base64<`jpeg`>;
  questionVideo?: URL | Base64<`jpeg`>;
  answerVideo?: URL | Base64<`jpeg`>;
};
type Base64<imageType extends string> =
  `data:image/${imageType};base64${string}`;

export type UpdatedCard = CardType & {
  answerImg: string;
  answerVideo: string;
  questionImg: string;
  questionVideo: string;
};
export type CreateCardResponseType = {
  newCard: CardType;
  token: string;
  tokenDeathTime: number;
};

export type UpdatedCardResponseType = {
  updatedCard: UpdatedCard;
  token: string;
  tokenDeathTime: number;
};

type DeletedCardResponseType = {
  deletedCard: UpdatedCard;
  token: string;
  tokenDeathTime: number;
};
