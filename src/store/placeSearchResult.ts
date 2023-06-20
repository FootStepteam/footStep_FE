import { atom } from "recoil";
import { IKakaoPlaceSearchResult } from "../type/kakaoPlaceSearchResult";

const initial: IKakaoPlaceSearchResult[] = [];

export const placeSearchResult = atom({
  key: "placeSearchResult",
  default: initial,
});
