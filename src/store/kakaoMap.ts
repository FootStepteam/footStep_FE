import { atom } from "recoil";

// const initial: any = {
//   map: null,
//   ps: null,
//   infowindow: null,
// };

const initial: any = {};

export const kakaoMapElement = atom({
  key: "kakaoMapElemennt",
  default: initial,
});
