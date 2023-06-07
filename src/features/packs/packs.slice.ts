import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk.ts";
import { thunkTryCatch } from "@/common/utils/thunk-try-catch.ts";
import {
  GetPacksResponseType,
  packsApi,
  PackType,
} from "@/features/packs/packs.api.ts";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "packs",
  initialState: { cardPacks: [] as PackType[] } as GetPacksResponseType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      return action.payload.data;
    });
  },
});

const getPacks = createAppAsyncThunk<{ data: any }>(
  "packs/getPacks",
  (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks();
      return { data: res.data };
    });
  }
);
export const packsReducer = slice.reducer;
export const packsThunks = { getPacks };
