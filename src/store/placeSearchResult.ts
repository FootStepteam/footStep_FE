import { atom } from "recoil";
import { IKakaoPlaceSearchResult } from "../type/kakaoMap";

const initial: IKakaoPlaceSearchResult[] = [];

export const placeSearchResult = atom({
  key: "placeSearchResult",
  default: initial,
});
