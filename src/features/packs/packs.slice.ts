import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk.ts";
import { thunkTryCatch } from "@/common/utils/thunk-try-catch.ts";
import {
  GetPacksResponseType,
  packsApi,
  PacksQueryParamsType,
  PackType,
} from "@/features/packs/packs.api.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "packs",
  initialState: {
    queryParams: {} as PacksQueryParamsType,
    cardsData: {
      cardPacks: [] as PackType[],
    } as GetPacksResponseType,
  },
  reducers: {
    setQueryParams: (
      state,
      action: PayloadAction<{ params: PacksQueryParamsType }>
    ) => {
      state.queryParams = action.payload.params;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.cardsData = action.payload.data;
    });
  },
});

const getPacks = createAppAsyncThunk<{ data: any }>(
  "packs/getPacks",
  (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { packName, sortPacks, page, pageCount, max, min, user_id, block } =
        thunkAPI.getState().packs.queryParams;
      const res = await packsApi.getPacks({
        packName,
        sortPacks,
        page,
        pageCount,
        max,
        min,
        user_id,
        block,
      });
      return { data: res.data };
    });
  }
);
export const packsReducer = slice.reducer;
export const packsThunks = { getPacks };
export const packsActions = slice.actions;
