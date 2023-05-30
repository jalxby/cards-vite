import { authThunks } from "@/features/auth/auth.slice.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: true,
    isAppInitialized: false,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authThunks.me.rejected, () => {});
  },
});

export const appReducer = slice.reducer;
export const { setIsLoading, setError } = slice.actions;
