import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk.ts";
import { thunkTryCatch } from "@/common/utils/thunk-try-catch.ts";
import {
  ArgSignInType,
  authApi,
  ProfileType,
  SignUpPayloadType,
} from "@/features/auth/auth.api.ts";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as null | ProfileType,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      });
  },
});

const signUp = createAppAsyncThunk<void, SignUpPayloadType>(
  "auth/signUp",
  async (arg: SignUpPayloadType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authApi.signUp(arg);
    });
  }
);

const signIn = createAppAsyncThunk<{ profile: ProfileType }, ArgSignInType>(
  "auth/signIn",
  async (arg) => {
    const res = await authApi.signIn(arg);
    return { profile: res.data };
  }
);

const me = createAppAsyncThunk("auth/me", async (_, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.me();
  });
});

export const authReducer = slice.reducer;
export const authThunks = { signUp, signIn, me };
export const authActions = slice.actions;
