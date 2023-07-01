import { atom } from "recoil";

export interface IDestinationDTOList {
  destinationId: number;
  destinationCategoryCode: string;
  destinationName: string;
  destinationAddress: string;
  lng: number;
  lat: number;
  seq: number;
}

export interface ISchedule {
  shareId: number;
  dayScheduleId: number;
  planDate: string;
  content: string;
  destinationDtoList: IDestinationDTOList[] | [];
}

export const schedule = atom<ISchedule | "">({
  key: "schedule",
  default: "",
});
