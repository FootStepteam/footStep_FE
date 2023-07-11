import { useRecoilValue } from "recoil";
import { sideBarState } from "../../state/sidebarState";
import SideBarToggle from "./SideBarToggle";
import PlaceSearchArea from "./placeSearchArea/PlaceSearchArea";
import ScheduleArea from "./scheduleArea/ScheduleArea";
import { IPlace } from "../../hooks/useSchdule";

interface IPropsSideBar {
  placeSearch: (keyword: string) => void;
  panTo: (placeX: number, placeY: number, index: number) => void;
  placePagination: any;
  addDestination: (place: IPlace) => void;
}

const SideBar = ({
  placeSearch,
  panTo,
  placePagination,
  addDestination,
}: IPropsSideBar) => {
  const sideBarOpenState = useRecoilValue(sideBarState);

  return (
    <div className="flex absolute min-h-screen">
      {!sideBarOpenState.schedule && <SideBarToggle />}
      <ScheduleArea />
      <PlaceSearchArea
        placeSearch={placeSearch}
        panTo={panTo}
        placePagination={placePagination}
        addDestination={addDestination}
      />
    </div>
  );
};

export default SideBar;
