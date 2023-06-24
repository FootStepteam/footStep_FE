import { useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { useSetRecoilState } from "recoil";
import { ReactComponent as Close } from "../../assets/close.svg";
import { placeSearchResult } from "../../store/placeSearchResult";
import { IKakaoPlaceSearchResult } from "../../type/kakaoMap";
import SideBar from "./SideBar";

interface IState {
  center: {
    lat: number;
    lng: number;
  };

  isPanto: boolean;
}

interface IInfo {
  data: IKakaoPlaceSearchResult;
  open: boolean;
}

interface IMarker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

interface IOpenOverlay {
  data: IKakaoPlaceSearchResult;
  open: boolean;
  index: number;
}

const PlanShareRoom = () => {
  const setPlaceSearchResult = useSetRecoilState(placeSearchResult);
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [placePagination, setPlacePagination] = useState<any>();
  const [openOverlay, setOpenOverlay] = useState<IOpenOverlay>({
    data: {
      address_name: "",
      category_group_code: "",
      category_group_name: "",
      category_name: "",
      distance: "",
      id: "initial",
      phone: "",
      place_name: "",
      place_url: "",
      road_address_name: "",
      x: 0,
      y: 0,
    },
    open: false,
    index: -1,
  });
  const [info, setInfo] = useState<IInfo[]>([
    {
      data: {
        address_name: "",
        category_group_code: "",
        category_group_name: "",
        category_name: "",
        distance: "",
        id: "initial",
        phone: "",
        place_name: "",
        place_url: "",
        road_address_name: "",
        x: 0,
        y: 0,
      },
      open: false,
    },
  ]);
  const [state, setState] = useState<IState>({
    center: { lat: 33.452613, lng: 126.570888 },
    isPanto: false,
  });

  const overlayOpen = (index: number, type: string) => {
    const deepCopyInfo = info.map((element: any, i: number) => {
      if (i === index) {
        if (type === "open") {
          return { ...element, open: true };
        } else {
          return { ...element, open: false };
        }
      }

      if (openOverlay !== null) {
        if (openOverlay.index === i) {
          return { ...element, open: false };
        }
      }
      return element;
    });
    setInfo(deepCopyInfo);

    if (type === "open") {
      setOpenOverlay({ ...info[index], index });
    }
  };

  const onClickMarkerHandler = (index: number, type: string) => {
    overlayOpen(index, type);
  };

  const placeSearch = (keyword: string) => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlacePagination(pagination);
        const infos: IInfo[] = [];

        for (let i = 0; i < data.length; i++) {
          const obj: IInfo = { data: data[i], open: false };
          infos.push(obj);
        }
        setInfo(infos);
        setPlaceSearchResult(data);
        const bounds = new kakao.maps.LatLngBounds();
        let markers: IMarker[] = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: Number(data[i].y),
              lng: Number(data[i].x),
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        map.setBounds(bounds);
      }
    });
  };

  const panTo = (placeX: number, placeY: number, index: number) => {
    setState({
      center: {
        lat: placeX,
        lng: placeY,
      },
      isPanto: true,
    });
    overlayOpen(index, "open");
  };

  return (
    <>
      <SideBar
        placeSearch={placeSearch}
        panTo={panTo}
        placePagination={placePagination}
      />
      <Map
        center={state.center}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => onClickMarkerHandler(index, "open")}
          >
            {info[index].open && (
              <CustomOverlayMap
                position={marker.position}
                zIndex={1010}
              >
                <div className="flex relative top-[-7.9rem] w-[20rem] h-[10rem] bg-white rounded-sm shadow-lg">
                  <div className="mt-6 ml-4 w-[16rem]">
                    <p className="mb-2 text-lg font-bold">
                      {info[index].data.place_name}
                    </p>
                    <p className="text-sm font-normal">
                      {info[index].data.address_name}
                    </p>
                    <p className="text-sm font-light">
                      {info[index].data.phone}
                    </p>
                    <div className="flex mt-2">
                      <a
                        href={`https://place.map.kakao.com/${info[index].data.id}`}
                        target="_blank"
                        className="text-sm text-blue-001 hover:text-blue-003"
                        rel="noreferrer"
                      >
                        상세보기
                      </a>
                      <button
                        type="button"
                        className="ml-2 text-sm text-gray-001 hover:text-gray-003"
                      >
                        장소추가
                      </button>
                    </div>
                  </div>
                  <div
                    className="grow pt-4 pl-4 text-black"
                    onClick={() => onClickMarkerHandler(index, "close")}
                    title="닫기"
                  >
                    <Close className="w-[20px] h-[20px]" />
                  </div>
                </div>
              </CustomOverlayMap>
            )}
          </MapMarker>
        ))}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
    </>
  );
};

export default PlanShareRoom;
