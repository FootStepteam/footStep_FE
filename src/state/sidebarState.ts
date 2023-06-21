import { atom } from "recoil";
import { ISideBarState } from "../type/sideBarOpenState";

const initialState: ISideBarState = {
  schedule: true,
  placeSearch: false,
};

export const sideBarState = atom<ISideBarState>({
  key: "sidebarState",
  default: initialState,
});
