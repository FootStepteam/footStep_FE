import { atom } from "recoil";

const initialState = false;

export const createModalOpenState = atom({
  key: "createModalOpenState",
  default: initialState,
});
