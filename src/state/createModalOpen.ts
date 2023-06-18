import { atom } from "recoil";

const initialState: boolean = false;

export const createModalOpenState = atom<boolean>({
  key: "createModalOpenState",
  default: initialState,
});
