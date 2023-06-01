import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk.ts";
import { thunkTryCatch } from "@/common/utils/thunk-try-catch.ts";
import {
  ArgSignInType,
  authApi,
  NewPasswordType,
  PassRecoveryType,
  ProfileModel,
  ProfileType,
  SignUpPayloadType,
} from "@/features/auth/auth.api.ts";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as null | ProfileType,
    info: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.info = action.payload.info;
        state.profile = null;
      })
      .addCase(changeProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      });
  },
});

const signUp = createAppAsyncThunk<void, SignUpPayloadType>(
  "auth/signUp",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authApi.signUp(arg);
    });
  }
);

const signIn = createAppAsyncThunk<{ profile: ProfileType }, ArgSignInType>(
  "auth/signIn",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.signIn(arg);
      return { profile: res.data };
    });
  }
);

const signOut = createAppAsyncThunk<{ info: string }>(
  "auth/signOut",
  async () => {
    const res = await authApi.signOut();
    return { info: res.data.info };
  }
);

const me = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/me",
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.me();
      return { profile: res.data };
    });
  }
);

const newPassRequest = createAppAsyncThunk<{ info: string }, PassRecoveryType>(
  "auth/newPassRequest",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.newPassRequest(arg);
      return { info: res.data.info };
    });
  }
);

const setNewPass = createAppAsyncThunk<{ info: string }, NewPasswordType>(
  "auth/setNewPass",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.setNewPass(arg);
      return { info: res.data.info };
    });
  }
);

const changeProfile = createAppAsyncThunk<
  { profile: ProfileType },
  ProfileModel
>("auth/changeProfile", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.changeProfile(arg);
    return { profile: res.data.updatedUser };
  });
});

export const authReducer = slice.reducer;
export const authThunks = {
  signUp,
  signIn,
  me,
  signOut,
  newPassRequest,
  setNewPass,
  changeProfile,
};
export const authActions = slice.actions;
