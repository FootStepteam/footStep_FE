export interface IPlan {
  shareName: string;
  shareId: number;
}

export interface IPlanSchedule {
  content: string;
  dayScheduleId: number;
  destinationDtoList: IDestinationInfo[];
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
