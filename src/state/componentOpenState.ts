import { atom } from "recoil";

const initialState = {
  header: false,
  daySelect: false,
  scheduleList: false,
  buttonSection: false,
  placeSection: false,
  memo: false,
};

export const disabledState = atom({
  key: "disabledState",
  default: initialState,
});
