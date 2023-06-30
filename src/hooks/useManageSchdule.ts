import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { addDestinationAPI, deleteDestinationAPI } from "../api/destinationAPI";
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

  const addDestination = async (place: IPlace) => {
    if (shareRoomID) {
      const bodyData = {
        planDate: selectedDate.planDate,
        destinationCategoryCode: "t",
        destinationName: place.placeName,
        destinationAddress: place.addressName,
        lng: place.x,
        lat: place.y,
        seq: 1,
      };

      addDestinationAPI(shareRoomID, bodyData);
    }
  };

  const deleteDestination = async (destinationId: number) => {
    if (shareRoomID) {
      deleteDestinationAPI(Number(shareRoomID), destinationId);
    }
  };

  return { addDestination, deleteDestination };
};

export default useManageSchedule;
