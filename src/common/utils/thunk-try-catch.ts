import { AppDispatch, RootState } from "@/app/store.ts";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: Function
) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await promise();
  } catch (error) {
    return rejectWithValue({ error });
  }
};
