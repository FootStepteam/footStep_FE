import { atom } from "recoil";
import { IShareRoom } from "../type/shareRoom";

const initialValue: IShareRoom = {
    endPoint: "",
    imageUrl: "",
    shareCode:"",
    shareId: 1,
    shareName: "",
    startPoint: "",
    travelEndDate: "",
    travelStartDate: ""
}

export const shareRoomInfo = atom({
    key: "shareRoomInfo",
    default: initialValue
})