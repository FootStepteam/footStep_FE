import { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getRecommendPlacesAPI } from "../../api/recommendAPI";
import { ReactComponent as Close } from "../../assets/close.svg";
import { markerSeq } from "../../constants/marker";
import useManageSchedule from "../../hooks/useManageSchdule";
import { recommendState } from "../../state/recommendState";
import { placeSearchResult } from "../../store/placeSearchResult";
import { recommendPlaceList } from "../../store/recommendPlaceList";
import Chat from "./Chat";
import SideBar from "./SideBar";
import { getMemberByAccessToken } from "../../api/memberAPI";
import { memberInfo } from "../../state/memberInfo";

interface IState {
  center: {
    lat: number;
    lng: number;
  };

  isPanto: boolean;
}

interface IInfo {
  data: {
    addressName: string;
    id: string;
    placeName: string;
    placeUrl: string;
    phone: string;
    x: number;
    y: number;
  };
  open: boolean;
}

interface IMarker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  type: string;
}

interface IOpenOverlay {
  data: {
    addressName: string;
    id: string;
    placeName: string;
    phone: string;
    placeUrl: string;
    x: number;
    y: number;
  };
  open: boolean;
  index: number;
}

export interface IRecommendPlace {
  firstImage: string;
  firstImage2: string;
  addr1: string;
  addr2: string;
  mapx: string;
  mapy: string;
  title: string;
}

const PlanShareRoom = () => {
  const recommendStatus = useRecoilValue(recommendState);
  const setRecommendPlaces = useSetRecoilState(recommendPlaceList);
  const setPlaceSearchResult = useSetRecoilState(placeSearchResult);
  const { addDestination } = useManageSchedule();
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const setMemberInfo = useSetRecoilState(memberInfo);
  const [placePagination, setPlacePagination] = useState<any>();
  const [openOverlay, setOpenOverlay] = useState<IOpenOverlay>({
    data: {
      addressName: "",
      id: "initial",
      phone: "",
      placeName: "",
      placeUrl: "",
      x: 0,
      y: 0,
    },
    open: false,
    index: -1,
  });
  const [info, setInfo] = useState<IInfo[]>([
    {
      data: {
        addressName: "",
        id: "initial",
        phone: "",
        placeName: "",
        placeUrl: "",
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

  const onClickAddDestinationHandler = (place: IInfo) => {
    addDestination(place.data);
  };

  const onClickMarkerHandler = (index: number, type: string) => {
    overlayOpen(index, type);
  };

  const getRecommendList = async (keyword: string) => {
    const result = await getRecommendPlacesAPI(keyword);

    const recommendPlace = result.imageList.map((place: IRecommendPlace) => {
      return {
        addressName: place.addr1,
        placeName: place.title,
        x: place.mapx,
        y: place.mapy,
      };
    });

    setRecommendPlaces(recommendPlace);
    return result.imageList;
  };

  const placeSearch = async (keyword: string) => {
    const ps = new kakao.maps.services.Places();
    const bounds = new kakao.maps.LatLngBounds();
    const recommendPlaces = await getRecommendList(keyword);

    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlacePagination(pagination);

        const infos = data.map((place) => {
          return {
            data: {
              addressName: place.address_name,
              id: place.id,
              phone: place.phone,
              placeName: place.place_name,
              placeUrl: place.place_url,
              x: Number(place.x),
              y: Number(place.y),
            },
            open: false,
          };
        });

        setPlaceSearchResult(data);
        let markers: IMarker[] = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: Number(data[i].y),
              lng: Number(data[i].x),
            },
            content: data[i].place_name,
            type: "search",
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        const recommendMarkers = recommendPlaces.map(
          (place: IRecommendPlace) => {
            bounds.extend(
              new kakao.maps.LatLng(Number(place.mapy), Number(place.mapx))
            );
            return {
              position: {
                lat: Number(place.mapy),
                lng: Number(place.mapx),
              },
              content: place.title,
              type: "recommend",
            };
          }
        );

        const recommendPlaceInfo = recommendPlaces.map(
          (place: IRecommendPlace) => {
            return {
              data: {
                addressName: place.addr1,
                id: "none",
                phone: "",
                placeName: place.title,
                placeUrl: "",
                x: place.mapx,
                y: place.mapy,
              },
              open: false,
            };
          }
        );
        setInfo([...infos, ...recommendPlaceInfo]);
        setMarkers([...markers, ...recommendMarkers]);
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

  const getMemberInfo = async () => {
    const response = await getMemberByAccessToken();
    setMemberInfo(response);
  };

  useEffect(() => {
    getMemberInfo();
  }, []);

  return (
    <>
      <SideBar
        placeSearch={placeSearch}
        panTo={panTo}
        placePagination={placePagination}
        addDestination={addDestination}
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
        {markers.map(
          (marker, index) =>
            ((marker.type === "recommend" && recommendStatus) ||
              marker.type === "search") && (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => onClickMarkerHandler(index, "open")}
                image={
                  marker.type === "recommend" && {
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                    size: {
                      width: 24,
                      height: 35,
                    },
                  }
                }
              >
                {info[index].open && (
                  <CustomOverlayMap
                    position={marker.position}
                    zIndex={1010}
                  >
                    <div className="flex relative top-[-7.7rem] w-[20rem] h-[10rem] bg-white border border-gray-002 rounded-sm shadow-lg">
                      <div className="mt-6 ml-4 w-[16rem]">
                        <p className="mb-2 text-lg font-bold truncate">
                          <span className="text-blue-001">
                            {markerSeq[index]}
                          </span>
                          {info[index].data.placeName}
                        </p>
                        <p className="text-sm font-normal truncate">
                          {info[index].data.addressName}
                        </p>
                        <p className="text-sm font-light">
                          {info[index].data.phone}
                        </p>
                        <div className="flex mt-2">
                          <button
                            type="button"
                            className="text-sm font-light text-gray-001 hover:text-gray-003"
                            onClick={() =>
                              onClickAddDestinationHandler(info[index])
                            }
                          >
                            장소추가
                          </button>
                          {info[index].data.id !== "none" && (
                            <a
                              href={`https://place.map.kakao.com/${info[index].data.id}`}
                              target="_blank"
                              className="ml-2 text-sm font-light text-blue-001 hover:text-blue-003"
                              rel="noreferrer"
                            >
                              상세보기
                            </a>
                          )}
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
            )
        )}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
      <Chat />
    </>
  );
};

export default PlanShareRoom;
