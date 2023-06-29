export interface IKakaoPlaceSearchResult {
  address_name: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
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
