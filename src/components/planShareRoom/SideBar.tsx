import PlaceSearch from "./sideBarComponents/placeSearchArea/PlaceSearchBar";
import DaySelect from "./sideBarComponents/DaySelect";
import PlaceLists from "./sideBarComponents/PlaceLists";
import SideBarHeader from "./sideBarComponents/SideBarHeader";

const SideBar = () => {
  return (
    <div>
      <div className="absolute left-0 top-0 w-[25rem] min-h-screen border-2">
        <SideBarHeader />
        <div className="mt-4">
          <DaySelect />
          <PlaceLists />
        </div>
      </div>
      <PlaceSearch />
    </div>
  );
};

export default SideBar;
