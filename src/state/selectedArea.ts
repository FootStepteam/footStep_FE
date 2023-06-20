import { atom } from "recoil";

export const selectedArea = atom<string>({
    key: "selectedArea",
    default: "noSelected"
})