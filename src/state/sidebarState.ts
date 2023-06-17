import { atom } from "recoil";
import { ISidebarState } from "../type/sideBarOpenState";

const initialState: ISidebarState = {
    schedule : true,
    placeSearch: false
}

export const sidebarState = atom<ISidebarState>({
    key: "sidebarState",
    default: initialState
})