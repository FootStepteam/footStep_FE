import { atom } from "recoil";
import { getTokenInCookies } from "../auth/auth";

export const jwtAccessTokenState = atom<string>({
  key: "jwtAccessTokenState",
  default: getTokenInCookies(),
});
