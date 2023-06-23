import { atom } from "recoil";

const initialValue = [
  {
    shareId: 0,
    dayScheduleId: 0,
    planDate: "",
    content: null,
    destinationDtoList: [
      {
        destinationId: "",
        destinationCategoryCode: "",
        destinationName: "",
        destinationAddress: "",
        lng: 0,
        lat: 0,
        seq: 0,
      },
    ],
  },
];

export const schedule = atom({
  key: "schedule",
  default: initialValue,
});
