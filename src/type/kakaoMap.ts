export interface IKakaoPlaceSearchResult {
  addressName: string;
  id: string;
  phone: string;
  placeName: string;
  placeUrl: string;
  x: number;
  y: number;
}

export interface IState {
  center: {
    lat: number;
    lng: number;
  };

  isPanto: boolean;
}

export interface IInfo {
  data: IKakaoPlaceSearchResult;
  open: boolean;
}

export interface IMarker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}
