import { useRecoilValue } from "recoil";
import { sidebarState } from "../../state/sidebarState";
import { IPropsPlaceSearch } from "../../type/shareRoom";
import PlaceSearchArea from "./placeSearchArea/PlaceSearchArea";
import ScheduleArea from "./scheduleArea/ScheduleArea";

const SideBar = ({ placeSearch }: IPropsPlaceSearch) => {
  const sidebarOpenState = useRecoilValue(sidebarState);

  return (
    <div className="flex absolute min-h-screen">
      {sidebarOpenState.schedule && <ScheduleArea />}
      <PlaceSearchArea placeSearch={placeSearch} />
    </div>
  );
};

export default SideBar;
