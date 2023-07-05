import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addDestinationAPI, deleteDestinationAPI } from "../api/destinationAPI";
import { getScheduleByDateAPI } from "../api/scheduleAPI";
import { schedule } from "../store/schedule";
import { selectedDay } from "../store/selectedDay";

export interface IPlace {
  placeName: string;
  addressName: string;
  y: number;
  x: number;
}

const useManageSchedule = () => {
  const { shareRoomID } = useParams();
  const selectedDate = useRecoilValue(selectedDay);
  const setScheduleInfo = useSetRecoilState(schedule);

  const addDestination = async (place: IPlace) => {
    if (shareRoomID) {
      const bodyData = {
        planDate: selectedDate.planDate,
        destinationCategoryCode: "t",
        destinationName: place.placeName,
        destinationAddress: place.addressName,
        lng: place.x,
        lat: place.y,
        seq: 999,
      };

      const response = await addDestinationAPI(Number(shareRoomID), bodyData);
      if (response?.status === 200) {
        const result = await getScheduleByDateAPI(
          Number(shareRoomID),
          selectedDate.planDate
        );
        setScheduleInfo(result?.data);
      }
    }
  };

  const deleteDestination = async (destinationId: number) => {
    if (shareRoomID) {
      const response = await deleteDestinationAPI(
        Number(shareRoomID),
        destinationId
      );

      if (response?.status === 200) {
        const result = await getScheduleByDateAPI(
          Number(shareRoomID),
          selectedDate.planDate
        );
        setScheduleInfo(result?.data);
      }
    }
  };

  return { addDestination, deleteDestination };
};

export default useManageSchedule;
