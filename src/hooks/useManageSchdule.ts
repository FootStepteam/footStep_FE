import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addDestinationAPI, deleteDestinationAPI } from "../api/destinationAPI";
import { getScheduleAPI } from "../api/scheduleAPI";
import { selectedDay } from "../store/selectedDay";
import { IKakaoPlaceSearchResult } from "../type/kakaoMap";
import { schedule } from "../store/schedule";

const useManageSchedule = () => {
  const { shareRoomID } = useParams();
  const selectedDate = useRecoilValue(selectedDay);
  const setSchedule = useSetRecoilState(schedule);

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

      if (response.status === 200) {
        getSchedule();
      }
    }
  };

  const deleteDestination = async (destinationId: string) => {
    if (shareRoomID) {
      const response = await deleteDestinationAPI(
        Number(shareRoomID),
        destinationId
      );

      if (response?.status === 200) {
        getSchedule();
      }
    }
  };

  const getSchedule = async () => {
    if (shareRoomID) {
      const response = await getScheduleAPI(shareRoomID);

      if (response?.status === 200) {
        setSchedule(response.data);
      }
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return { addDestination, deleteDestination };
};

export default useManageSchedule;
