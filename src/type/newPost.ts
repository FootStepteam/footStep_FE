export interface IPlan {
  shareName: string;
  shareId: number;
}

export interface IPlanSchedule {
  destinationRedisInfo: IDestinationInfo[];
  planDate: string;
  shareId: number;
}

export interface IDestinationInfo {
  destinationAddress: string;
  destinationCategoryCode: string;
  destinationName: string;
  id: number;
  lat: string;
  lng: string;
  seq: number;
}
