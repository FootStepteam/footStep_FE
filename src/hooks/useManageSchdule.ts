import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { addDestinationAPI } from "../api/destinationAPI";
import { getScheduleAPI } from "../api/scheduleAPI";
import { selectedDay } from "../store/selectedDay";
import { IKakaoPlaceSearchResult } from "../type/kakaoMap";

const useManageSchedule = () => {
  const { shareRoomID } = useParams();
  const selectedDate = useRecoilValue(selectedDay);
  // const;

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

      const response = await addDestinationAPI(shareRoomID, bodyData);

      if (response?.status === 200) {
      }
    }
  };

  const getSchedule = async () => {
    if (shareRoomID) {
      const response = await getScheduleAPI(shareRoomID);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return { addDestination };
};

export default useManageSchedule;
