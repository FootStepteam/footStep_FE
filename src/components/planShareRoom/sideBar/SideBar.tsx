import PlaceSearchArea from "./placeSearchArea/PlaceSearchArea";
import ScheduleArea from "./scheduleArea/ScheduleArea";

const SideBar = () => {
  return (
    <div className="flex absolute min-h-screen bg-white z-[9001]">
      <ScheduleArea />
      <PlaceSearchArea />
    </div>
  );
};

export default SideBar;
