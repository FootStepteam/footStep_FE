export interface IShareRoom {
  endPoint: string;
  imageUrl: string;
  shareCode: string;
  shareId: number;
  shareName: string;
  startPoint: string;
  travelEndDate: string;
  travelStartDate: string;
}
export interface ISubmitShareRoomData {
  shareName: string;
  travelEndDate: string;
  travelStartDate: string;
  imageUrl: string;
}

export interface ICreateShareRoomFormValue {
  title: string;
  startDate: string;
  endDate: string;
}

export interface IPropsPlaceSearch {
  placeSearch: (keyword: string) => void;
}
