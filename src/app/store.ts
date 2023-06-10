import { appReducer } from "@/app/app.slice.ts";
import { authReducer } from "@/features/auth/auth.slice.ts";
import { packsReducer } from "@/features/packs/packs.slice.ts";
import { configureStore, createStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
