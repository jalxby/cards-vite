import { RootState } from "@/app/store.ts";

export const selectToken = (state: RootState) => state.auth.profile?.token;
export const selectName = (state: RootState) => state.auth.profile?.name;
export const selectEmail = (state: RootState) => state.auth.profile?.email;
export const selectTokenDeathTime = (state: RootState) =>
  state.auth.profile?.tokenDeathTime;
export const selectMyUserId = (state: RootState) => state.auth.profile?._id;
