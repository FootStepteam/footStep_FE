import { atom } from "recoil";

const initialValue = {
  date: 0,
  day: "",
  month: 0,
  planDate: "",
  planDay: 0,
};

export const selectedDay = atom({
  key: "selectedDay",
  default: initialValue,
});
