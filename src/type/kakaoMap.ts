export interface IKakaoPlaceSearchResult {
  address_name: string;
  category_group_code:
    | ""
    | "MT1"
    | "CS2"
    | "PS3"
    | "SC4"
    | "AC5"
    | "PK6"
    | "OL7"
    | "SW8"
    | "BK9"
    | "CT1"
    | "AG2"
    | "PO3"
    | "AT4"
    | "AD5"
    | "FD6"
    | "CE7"
    | "HP8"
    | "PM9"
    | (
        | "MT1"
        | "CS2"
        | "PS3"
        | "SC4"
        | "AC5"
        | "PK6"
        | "OL7"
        | "SW8"
        | "BK9"
        | "CT1"
        | "AG2"
        | "PO3"
        | "AT4"
        | "AD5"
        | "FD6"
        | "CE7"
        | "HP8"
        | "PM9"
      )[]
    | undefined;
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