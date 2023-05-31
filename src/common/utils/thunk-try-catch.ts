import { setError } from "@/app/app.slice.ts";
import { AppDispatch, RootState } from "@/app/store.ts";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AxiosError, isAxiosError } from "axios";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, null>,
  logic: Function
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    console.log("from thunkTryCatch", e);
    const err = e as Error | AxiosError<{ error: string }>;
    if (isAxiosError(err)) {
      const error = err.response ? err.response.data.error : err.message;
      dispatch(setError({ error }));
    } else {
      dispatch(setError({ error: `Native error ${err.message}` }));
    }
    return rejectWithValue(null);
  }
};
