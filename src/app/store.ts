import { appReducer } from "@/app/app.slice.ts";
import { authReducer } from "@/features/auth/auth.slice.ts";
import { packsReducer } from "@/features/packs/packs.slice.ts";
import { configureStore, createStore } from "@reduxjs/toolkit";
import { cardsReducer } from "@/features/cards/cards.slice.ts";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
