import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { addDestinationAPI, deleteDestinationAPI } from "../api/destinationAPI";
import { selectedDay } from "../store/selectedDay";
import { IKakaoPlaceSearchResult } from "../type/kakaoMap";

const useManageSchedule = () => {
  const { shareRoomID } = useParams();
  const selectedDate = useRecoilValue(selectedDay);

  const addDestination = async (place: IKakaoPlaceSearchResult) => {
    if (shareRoomID) {
      const bodyData = {
        planDate: selectedDate.planDate,
        destinationCategoryCode: "t",
        destinationName: place.place_name,
        destinationAddress: place.address_name,
        lng: place.y,
        lat: place.x,
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
