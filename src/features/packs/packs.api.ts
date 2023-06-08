import { instance } from "@/common/api/common.api.ts";

export const packsApi = {
  getPacks(params?: PacksQueryParamsType) {
    return instance.get<GetPacksResponseType>("cards/pack", { params: params });
  },
  createPack(params: NewPackQueryParamsType) {
    return instance.post("cards/pack");
  },
  deletePack(id: string) {
    return instance.delete("cards/pack");
  },
  updatePack(params: { id: string; newTitle: string }) {
    return instance.put("cards/pack", params);
  },
};
export type PacksQueryParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: string;
};

type NewPackQueryParamsType = {
  name?: string;
  deckCover?: URL;
  private?: boolean;
};

export type GetPacksResponseType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: Date;
  tokenDeathTime: Date;
};
export type PackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: Date;
  updated: Date;
  more_id: string;
  __v: number;
};
