import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { placeSearchResult } from "../../store/placeSearchResult";
import { IKakaoPlaceSearchResult } from "../../type/kakaoPlaceSearchResult";
import Map from "./map/Map";
import SideBar from "./sideBar/SideBar";

declare global {
  interface Window {
    kakao: any;
  }
}

const PlanShareRoom = () => {
  const [mapElement, setMapElement] = useState<any>({});
  const setSearchPlaceResult = useSetRecoilState(placeSearchResult);

  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const ps = new window.kakao.maps.services.Places();
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 9005 });
    setMapElement({ map, ps, infowindow });
  }, []);

  const displayMarker = (place: IKakaoPlaceSearchResult) => {
    const marker = new window.kakao.maps.Marker({
      map: mapElement.map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, "click", () => {
      mapElement.infowindow.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
      );
      mapElement.infowindow.open(mapElement.map, marker);
    });
  };

  const displayPagination = (pagination: any) => {
    const paginationDOM = document.getElementById("pagination") as HTMLElement;
    const fragment = document.createDocumentFragment();

    // 기존에 추가된 페이지 번호 삭제
    while (paginationDOM.hasChildNodes()) {
      if (paginationDOM.lastChild) {
        paginationDOM.removeChild(paginationDOM.lastChild);
      }
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.innerHTML = String(i);

      if (i === pagination.current) {
        el.className = "on";
      } else {
        // eslint-disable-next-line no-shadow, func-names
        el.onclick = (function (i) {
          // eslint-disable-next-line func-names
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationDOM.appendChild(fragment);
  };

  const placeSearchCB = (
    places: IKakaoPlaceSearchResult[],
    status: string,
    pagination: any
  ) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setSearchPlaceResult(places);

      const bounds = new window.kakao.maps.LatLngBounds();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < places.length; i++) {
        displayMarker(places[i]);
        bounds.extend(new window.kakao.maps.LatLng(places[i].y, places[i].x));
      }

      mapElement.map.setBounds(bounds);
      displayPagination(pagination);
    }
  };

  const placeSearch = (keyword: string) => {
    if (keyword === null) return;
    mapElement.ps.keywordSearch(keyword, placeSearchCB);
  };

  return (
    <>
      <SideBar placeSearch={placeSearch} />
      <Map />
    </>
  );
};

export default PlanShareRoom;
