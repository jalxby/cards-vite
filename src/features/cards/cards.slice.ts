import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetPacksResponseType } from "@/features/packs/packs.api.ts";
import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk.ts";
import { thunkTryCatch } from "@/common/utils/thunk-try-catch.ts";
import {
  cardsApi,
  CardsQueryParamsType,
  GetCardsResponseType,
} from "@/features/cards/cards.api.ts";

const slice = createSlice({
  name: "cards",
  initialState: {
    cardsPerPage: ["5", "10", "15", "25", "50", "100"],
    queryParams: {} as CardsQueryParamsType,
    cardsData: {} as GetCardsResponseType,
  },
  reducers: {
    setQueryParams: (
      state,
      action: PayloadAction<{ params: CardsQueryParamsType }>
    ) => {
      state.queryParams = action.payload.params;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cardsData = action.payload.data;
    });
  },
});

const getCards = createAppAsyncThunk<{ data: GetCardsResponseType }>(
  "cards/getCards",
  (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const params = thunkAPI.getState().cards.queryParams;
      const res = await cardsApi.getCards(params);
      return { data: res.data };
    });
  }
);

export const cardsReducer = slice.reducer;
export const cardsThunks = { getCards };
export const { setQueryParams } = slice.actions;
