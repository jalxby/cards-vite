import { instance, instancePassRestore } from "@/common/api/common.api.ts";
import { AxiosResponse } from "axios";

export const authApi = {
  signUp(payload: SignUpPayloadType) {
    return instance.post<SignUpResponseType, AxiosResponse<SignUpResponseType>>(
      "auth/register",
      payload
    );
  },
  signIn(payload: ArgSignInType) {
    return instance.post<ProfileType, AxiosResponse<ProfileType>>(
      "auth/login",
      payload
    );
  },
  signOut() {
    return instance.delete<{ info: string }, AxiosResponse<{ info: string }>>(
      "auth/me"
    );
  },
  me() {
    return instance.post<ProfileType, AxiosResponse<ProfileType>>("auth/me");
  },
  changeProfile(payload: ProfileModel) {
    return instance.put<UpdatedUser, AxiosResponse<UpdatedUser>>(
      "auth/me",
      payload
    );
  },
  newPassRequest(payload: PassRecoveryType) {
    return instancePassRestore.post<
      { info: string },
      AxiosResponse<{ info: string }>
    >("auth/forgot", payload);
  },
  setNewPass(payload: NewPasswordType) {
    return instancePassRestore.post<
      { info: string },
      AxiosResponse<{ info: string }>
    >("auth/set-new-password", payload);
  },
};

export type NewPasswordType = {
  password: string;
  resetPasswordToken: string;
};
export type PassRecoveryType = {
  email: string;
  from?: string;
  message: string;
};

export type SignUpPayloadType = {
  email: string;
  password: string;
};
export type SignUpResponseType = {
  addedUser: UserType;
};
type UserType = Omit<ProfileType, "token" | "tokenDeathTime">;

export type ArgSignInType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ProfileModel = {
  name?: string;
  avatar?: URL;
};
type UpdatedUser = {
  updatedUser: ProfileType;
};
export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};
