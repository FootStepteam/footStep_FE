import { atom } from "recoil";
import { IShareRoom } from "../type/shareRoom";

const initial:IShareRoom[] = [];

export const getShareRoomList = atom({
    key: "getShareRoomList",
    default: initial,
})