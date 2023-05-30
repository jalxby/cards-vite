import { appReducer } from "@/app/app.slice.ts";
import { authReducer } from "@/features/auth/auth.slice.ts";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
