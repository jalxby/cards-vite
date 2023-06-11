import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk.ts";
import { thunkTryCatch } from "@/common/utils/thunk-try-catch.ts";
import {
  GetPacksResponseType,
  NewPackQueryParamsType,
  NewPackResponse,
  packsApi,
  PacksQueryParamsType,
  PackType,
} from "@/features/packs/packs.api.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      state.queryParams = { ...state.queryParams, ...action.payload.params };
    },
    clearQueryParams: (state) => {
      state.queryParams = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.cardsData = action.payload.data;
    });
  },
});

const testThunk = createAsyncThunk("packs/testThunk", (arg, thunkAPI) => {});

const createPack = createAppAsyncThunk<
  { data: NewPackResponse },
  NewPackQueryParamsType
>("packs/createPack", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.createPack(arg);
    thunkAPI.dispatch(getPacks());
  });
});

const deletePack = createAppAsyncThunk<any, string>(
  "packs/deletePack",
  (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.deletePack(arg);
      thunkAPI.dispatch(getPacks());
    });
  }
);

const getPacks = createAppAsyncThunk<{ data: GetPacksResponseType }>(
  "packs/getPacks",
  (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const {
        packName,
        sortPacks,
        page,
        pageCount = 5,
        max,
        min,
        user_id,
        block,
      } = thunkAPI.getState().packs.queryParams;
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
export const packsThunks = { testThunk, getPacks, createPack, deletePack };
export const packsActions = slice.actions;
