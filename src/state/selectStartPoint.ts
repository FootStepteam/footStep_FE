import { atom } from "recoil";
import { IStartPoint } from "../type/startPoint";

export const initialValue: IStartPoint = {
  lng: 0,
  lat: 0,
  planDate: "",
};

export const selecteStartPoint = atom<IStartPoint>({
  key: "selecteStartPoint",
  default: initialValue,
});
