import { atom } from "recoil";
import { ICreateShareRoomFormValue } from "../type/shareRoom";

const initialValue: ICreateShareRoomFormValue = {
  title: "",
  startDate: "",
  endDate: "",
};

export const createShareRoomFormValue = atom<ICreateShareRoomFormValue>({
  key: "createShareRoomFormValue",
  default: initialValue,
});
