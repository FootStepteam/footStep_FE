import { atom } from "recoil";
import { IKakaoPlaceSearchResult } from "../type/kakaoPlaceSearchResult";

const initial: IKakaoPlaceSearchResult[] = [
  {
    address_name: "",
    category_group_code: "",
    category_group_name: "",
    category_name: "",
    distance: "",
    id: "",
    phone: "",
    place_name: "",
    place_url: "",
    road_address_name: "",
    x: "",
    y: "",
  },
];
export const placeSearchResult = atom({
  key: "placeSearchResult",
  default: initial,
});
