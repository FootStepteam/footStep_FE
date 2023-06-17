import { atom } from "recoil";
import { ISidebarState } from "../type/sideBar";

const initialState: ISidebarState = {
    schedule : true,
    placeSearch: false
}

export const sidebarState = atom({
    key: "sidebarState",
    default: initialState
})