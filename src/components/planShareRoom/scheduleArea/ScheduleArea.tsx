import { useRecoilState } from "recoil";
import { ReactComponent as LeftArrow } from "../../../assets/leftArrow.svg";
import { sideBarState } from "../../../state/sidebarState";
import ScheduleAreaHeader from "./ScheduleAreaHeader";
import ScheduleDaySelect from "./ScheduleDaySelect";
import ScheduleLists from "./ScheduleLists";

const ScheduleArea = () => {
  const [sideBarOpenState, setSidebarOpenState] = useRecoilState(sideBarState);

  const onClickHandler = () => {
    setSidebarOpenState({
      ...sideBarOpenState,
      schedule: !sideBarOpenState.schedule,
    });
  };

  return (
    <div
      className={`relative ${
        sideBarOpenState.schedule ? "left-0" : "left-[-25rem]"
      } w-planShareRoomSideBar h-[100vh] shadow-xl bg-gray-005 z-[1003] transition-[left] duration-300 ease-in-out`}
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
      <div className="absolute top-0 left-0 w-planShareRoomSideBar h-screen bg-gray-005 z-[1004] opacity-50"></div>
    </div>
  );
};

export default ScheduleArea;
