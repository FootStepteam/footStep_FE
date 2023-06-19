import { atom } from "recoil";
import { ICreateShareRoomFormValue } from "../type/shareRoom";

export const initialValue: ICreateShareRoomFormValue = {
  title: "",
  startDate: "",
  endDate: "",
};

export const createShareRoomForm = atom<ICreateShareRoomFormValue>({
  key: "createShareRoomFormValue",
  default: initialValue,
});
