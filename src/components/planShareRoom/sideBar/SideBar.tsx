import { IPropsPlaceSearch } from "../../../type/shareRoom";
import PlaceSearchArea from "./placeSearchArea/PlaceSearchArea";
import ScheduleArea from "./scheduleArea/ScheduleArea";

const SideBar = ({ placeSearch }: IPropsPlaceSearch) => {
  return (
    <div className="flex absolute min-h-screen bg-white z-[9001]">
      <ScheduleArea />
      <PlaceSearchArea placeSearch={placeSearch} />
    </div>
  );
};

export default SideBar;
