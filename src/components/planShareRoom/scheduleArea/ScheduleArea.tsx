import { useRecoilState } from "recoil";
import { ReactComponent as LeftArrow } from "../../../assets/leftArrow.svg";
import ScheduleDaySelect from "./ScheduleDaySelect";
import ScheduleAreaHeader from "./ScheduleAreaHeader";
import { sideBarState } from "../../../state/sidebarState";
import ScheduleLists from "./ScheduleLists";
import { useEffect } from "react";
import { getScheduleAPI } from "../../../api/scheduleAPI";
import { useParams } from "react-router-dom";

const ScheduleArea = () => {
  const [sideBarOpenState, setSidebarOpenState] = useRecoilState(sideBarState);
  const { shareRoomID } = useParams();

  const onClickHandler = () => {
    setSidebarOpenState({
      ...sideBarOpenState,
      schedule: !sideBarOpenState.schedule,
    });
  };

  useEffect(() => {
    if (shareRoomID) {
      const response = getScheduleAPI(shareRoomID);
      console.log(response);
    }
  }, []);

  return (
    <div
      className={`relative ${
        sideBarOpenState.schedule ? "left-0" : "left-[-25rem]"
      } w-planShareRoomSideBar shadow-xl bg-gray-007 z-[1003] transition-[left] duration-300 ease-in-out`}
    >
      <ScheduleAreaHeader />
      <ScheduleDaySelect />
      <ScheduleLists />
      <div
        className={`${
          sideBarOpenState.placeSearch && "hidden"
        } flex items-center absolute top-[50%] right-[-7%] w-6 h-16 bg-white rounded-r-xl cursor-pointer`}
        onClick={onClickHandler}
      >
        <LeftArrow className="w-[20px] h-[20px] fill-[#DCDCDC]" />
      </div>
    </div>
  );
};

export default ScheduleArea;
