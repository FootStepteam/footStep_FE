import { useRecoilValue } from "recoil";
import { sideBarState } from "../../state/sidebarState";
import { IPropsSideBar } from "../../type/shareRoom";
import SideBarToggle from "./SideBarToggle";
import PlaceSearchArea from "./placeSearchArea/PlaceSearchArea";
import ScheduleArea from "./scheduleArea/ScheduleArea";

const SideBar = ({ placeSearch, panTo, placePagination }: IPropsSideBar) => {
  const sideBarOpenState = useRecoilValue(sideBarState);

  return (
    <div className="flex absolute min-h-screen">
      {!sideBarOpenState.schedule && <SideBarToggle />}
      <ScheduleArea />
      <PlaceSearchArea
        placeSearch={placeSearch}
        panTo={panTo}
        placePagination={placePagination}
      />
    </div>
  );
};

export default SideBar;
