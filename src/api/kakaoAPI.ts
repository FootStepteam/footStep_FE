import { SetterOrUpdater } from "recoil";
import { IKakaoPlaceSearchResult } from "../type/kakaoPlaceSearchResult";

const { kakao } = window as any;

export const ps = new kakao.maps.services.Places();

export const createMap = () => {
  const mapContainer = document.getElementById("map"); // 지도를 표시할 div
  const mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };
  const map = new kakao.maps.Map(mapContainer, mapOption);
  return map;
};

const displayPlaces = (places: IKakaoPlaceSearchResult[]) => {
  places.forEach((place, index) => {
    console.log(place, index);
  });
};

export const placeSearch = (
  keyword: string,
  setSearchPlaceResult: SetterOrUpdater<IKakaoPlaceSearchResult[]>
) => {
  if (keyword === null) return;

  ps.keywordSearch(
    keyword,
    (data: IKakaoPlaceSearchResult[], status: string, pagination: any) => {
      console.log(status, pagination);
      displayPlaces(data);
      setSearchPlaceResult(data);
    }
  );
};
