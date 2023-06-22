import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getShareRoomInfoAPI } from "../../api/shareRoomAPI";
import { placeSearchResult } from "../../store/placeSearchResult";
import { shareRoomInfo } from "../../store/shareRoomInfo";
import { IKakaoPlaceSearchResult } from "../../type/kakaoPlaceSearchResult";
import SideBar from "./SideBar";

declare global {
  interface Window {
    kakao: any;
  }
}

const PlanShareRoom = () => {
  const [mapElement, setMapElement] = useState<any>({});
  const setPlanShareRoomInfo = useSetRecoilState(shareRoomInfo);
  const setSearchPlaceResult = useSetRecoilState(placeSearchResult);
  const { shareRoomID } = useParams<string>();

  const getShareRoomInfo = async () => {
    if (shareRoomID) {
      const result = await getShareRoomInfoAPI(shareRoomID);

      setPlanShareRoomInfo(result);
    }
  };

  let clickedOverlay: any = null;

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

    const content = `
      <div style="display:flex; width: 18rem; height: 7.5rem; background-color: white;">
        <div style="padding-top:0.8rem; padding-left:1rem; width: 17rem;">
          <p style="font-size:1.2rem; font-weight:700;">${place.place_name}</p>
          <p style="font-size:0.8rem; font-weight:400;">${place.address_name}</p>
          <p style="font-size:0.7rem; font-weight:300;">${place.phone}</p>
          <a style="font-size:0.8rem; color:#5AD18F;" href="https://place.map.kakao.com/${place.id}">상세보기</a>
        </div>
        <div style="padding-top:0.5rem; padding-right:1rem; font-size:1.2rem; font-weight:700; cursor:pointer;" title="닫기">X</div>
      </div>
    `;

    const options = {
      map: mapElement.map,
      position: marker.getPosition(),
      content: content,
    };

    const customOverlay = new window.kakao.maps.CustomOverlay(options);
    setMapElement({ ...mapElement, customOverlay });
    customOverlay.setMap(null);

    window.kakao.maps.event.addListener(marker, "click", () => {
      if (clickedOverlay !== null) {
        clickedOverlay.setMap(null);
      }

      customOverlay.setMap(mapElement.map);
      clickedOverlay = customOverlay;
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
      <div
        id="map"
        className="relative w-[100vw] h-[100vh] z-[1000]"
      />
    </>
  );
};

export default PlanShareRoom;
