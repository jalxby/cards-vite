import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk.ts";
import { globalRouter } from "@/common/utils/globalRouter.ts";
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
import { packsThunks } from "@/features/packs/packs.slice.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      globalRouter.navigate && globalRouter.navigate("/signin");
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

const signOut = createAsyncThunk<
  { info: string },
  unknown,
  { rejectValue: string }
>("auth/signOut", async (arg, thunkAPI) => {
  try {
    const res = await authApi.signOut();
    return { info: res.data.info };
  } catch (e) {
    return thunkAPI.rejectWithValue("error");
  }
});

const me = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/me",
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.me();
      thunkAPI.dispatch(packsThunks.getPacks());
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
      globalRouter.navigate && globalRouter.navigate("/signin");
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
