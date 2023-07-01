import { atom } from "recoil";

export const lastLocationState = atom({
  key: "lastLocationState",
  default: "/",
});
