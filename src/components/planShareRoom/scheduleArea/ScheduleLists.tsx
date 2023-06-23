import { useRecoilValue } from "recoil";
import { schedule } from "../../../store/schedule";
import { selectedDay } from "../../../store/selectedDay";
import ExistsSchedule from "./ExistsSchedule";
import NotExistsSchedule from "./NotExistsSchedule";

const ScheduleLists = () => {
  const scheduleList = useRecoilValue(schedule);
  const selectedDate = useRecoilValue(selectedDay);
  const isExists =
    scheduleList[selectedDate.planDay - 1] !== undefined &&
    scheduleList[selectedDate.planDay - 1].destinationDtoList.length !== 0;

  return <>{isExists ? <ExistsSchedule /> : <NotExistsSchedule />}</>;
};

export default ScheduleLists;
