import { instance } from "@/common/api/common.api.ts";

export const packsApi = {
  getPacks(params: PacksQueryParamsType) {
    return instance.get("cards/pack", { params: params });
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
type PacksQueryParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: string;
  pageCount?: number;
  user_id?: string;
  block?: string;
};

type NewPackQueryParamsType = {
  name?: string;
  deckCover?: URL;
  private?: boolean;
};

type PackType = {};
