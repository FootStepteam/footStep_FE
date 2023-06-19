export interface Plan {
  shareName: string;
  shareId: number;
}

export interface PlanSchedule {
  destinationRedisInfo: DestinationInfo[];
  planDate: string;
  shareId: number;
}

export interface DestinationInfo {
  destinationAddress: string;
  destinationCategoryCode: string;
  destinationName: string;
  id: number;
  lat: string;
  lng: string;
  seq: number;
}
