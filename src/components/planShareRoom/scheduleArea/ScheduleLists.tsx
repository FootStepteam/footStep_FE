import { useRecoilValue } from "recoil";
import { schedule } from "../../../store/schedule";
import { selectedDay } from "../../../store/selectedDay";
import ExistsSchedule from "./ExistsSchedule";
import NotExistsSchedule from "./NotExistsSchedule";
import { useEffect, useState } from "react";

const ScheduleLists = () => {
  const scheduleList = useRecoilValue(schedule);
  const selectedDate = useRecoilValue(selectedDay);
  const [isExists, setIsExists] = useState<boolean>(false);

  const exsists = () => {
    if (scheduleList[selectedDate.planDay - 1] !== undefined) {
      if (scheduleList[selectedDate.planDay - 1].shareId) {
        setIsExists(true);
      } else {
        setIsExists(false);
      }
    }
  };

  useEffect(() => {
    exsists();
  }, [scheduleList]);

  return <>{isExists ? <ExistsSchedule /> : <NotExistsSchedule />}</>;
};

export default ScheduleLists;
