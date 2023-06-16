import { atom } from "recoil";
import { ISignupFormData } from "../type/signUp";

export const signUpFormState = atom<ISignupFormData>({
  key: "signUpFormState",
  default: {
    gender: "",
    loginEmail: "",
    nickname: "",
    password: "",
  },
});
