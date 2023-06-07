import { RootState } from "@/app/store.ts";

export const selectIsLoading = (state: RootState) => state.app.isLoading;
export const selectError = (state: RootState) => state.app.error;
