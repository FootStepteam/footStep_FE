import { useRecoilValue } from "recoil";
import { sideBarState } from "../../state/sidebarState";
import { IPropsPlaceSearch } from "../../type/shareRoom";
import PlaceSearchArea from "./placeSearchArea/PlaceSearchArea";
import ScheduleArea from "./scheduleArea/ScheduleArea";
import SideBarToggle from "./SideBarToggle";

const SideBar = ({ placeSearch }: IPropsPlaceSearch) => {
  const sideBarOpenState = useRecoilValue(sideBarState);

  return (
    <div className="flex absolute min-h-screen">
      {!sideBarOpenState.schedule && <SideBarToggle />}
      <ScheduleArea />
      <PlaceSearchArea placeSearch={placeSearch} />
    </div>
  );
};

export default SideBar;
