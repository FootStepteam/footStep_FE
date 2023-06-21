import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { placeSearchResult } from "../../store/placeSearchResult";
import { IKakaoPlaceSearchResult } from "../../type/kakaoPlaceSearchResult";
import SideBar from "./SideBar";
import { shareRoomInfo } from "../../store/shareRoomInfo";
import { getShareRoomInfoAPI } from "../../api/shareRoomAPI";
import { useParams } from "react-router-dom";
import { jwtAccessTokenState } from "../../state/loginState";

declare global {
  interface Window {
    kakao: any;
  }
}

const PlanShareRoom = () => {
  const [mapElement, setMapElement] = useState<any>({});
  const token = useRecoilValue(jwtAccessTokenState);
  const setPlanShareRoomInfo = useSetRecoilState(shareRoomInfo);
  const setSearchPlaceResult = useSetRecoilState(placeSearchResult);
  const { shareRoomID } = useParams<string>();

  const getShareRoomInfo = async () => {
    if (shareRoomID) {
      const result = await getShareRoomInfoAPI(shareRoomID, token);
      console.log(result);
      setPlanShareRoomInfo(result);
    }
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const ps = new window.kakao.maps.services.Places();
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 9005 });
    setMapElement({ map, ps, infowindow });
    getShareRoomInfo();
  }, []);

  const displayMarker = (place: IKakaoPlaceSearchResult) => {
    const marker = new window.kakao.maps.Marker({
      map: mapElement.map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, "click", () => {
      mapElement.infowindow.setContent(
        `<div style="display:flex; flex-direction:column;padding:5px;font-size:12px;">
          <p>${place.place_name}</p>
          <p style="font-size:9px">${place.address_name}</p>
        </div>`
      );
      mapElement.infowindow.open(mapElement.map, marker);
    });
  };

  const displayPagination = (pagination: any) => {
    const paginationDOM = document.getElementById("pagination") as HTMLElement;
    const fragment = document.createDocumentFragment();

    while (paginationDOM.hasChildNodes()) {
      if (paginationDOM.lastChild) {
        paginationDOM.removeChild(paginationDOM.lastChild);
      }
    }

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.innerHTML = String(i);
      el.style.margin = "2px 8px";
      if (i === pagination.current) {
        el.className = "on";
        el.style.color = "#00AFFF";
      } else {
        el.onclick = (function (i) {
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
      console.log(places);
      const bounds = new window.kakao.maps.LatLngBounds();

      places.forEach((place) => {
        displayMarker(place);
        bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
      });

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
      <div id="map" className="relative w-[100vw] h-[100vh] z-[1000]" />
    </>
  );
};

export default PlanShareRoom;
