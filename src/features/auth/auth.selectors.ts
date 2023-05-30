import { RootState } from "app/store";

export const selectToken = (state: RootState) => state.auth.profile?.token;
export const selectTokenDeathTime = (state: RootState) =>
  state.auth.profile?.tokenDeathTime;
