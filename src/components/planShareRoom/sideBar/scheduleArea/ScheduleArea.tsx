import DaySelect from "./DaySelect";
import PlaceLists from "./PlaceLists";
import SideBarHeader from "./SideBarHeader";

const ScheduleArea = () => {
  return (
    <div className="w-[25rem]">
      <SideBarHeader />
      <DaySelect />
      <PlaceLists />
    </div>
  );
};

export default ScheduleArea;
