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
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const queryParamsDefaults = {
  pageCount: 5,
  packName: "",
  user_id: "",
} as PacksQueryParamsType;

const slice = createSlice({
  name: "packs",
  initialState: {
    packsPerPage: ["5", "10", "15", "25", "50", "100"],
    queryParams: queryParamsDefaults,
    packsData: {
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
      state.queryParams = {
        pageCount: state.queryParams.pageCount,
        packName: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packsData = action.payload.data;
    });
  },
});

const updatePack = createAppAsyncThunk<any, { _id: string; name: string }>(
  "packs/updatePack",
  (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.updatePack(arg);
      thunkAPI.dispatch(getPacks());
    });
  }
);

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
      const params = thunkAPI.getState().packs.queryParams;
      const res = await packsApi.getPacks(params);
      return { data: res.data };
    });
  }
);
export const packsReducer = slice.reducer;
export const packsThunks = { updatePack, getPacks, createPack, deletePack };
export const packsActions = slice.actions;
