import PlaceSearchCategory from "./PlaceSearchCategory";
import PlaceSearchBar from "./PlaceSearchBar";
import PlaceSearchLists from "./PlaceSearchLists";

const PlaceSearchArea = () => {
  return (
    <div className="absolute left-[25rem] top-0 w-[25rem] min-h-screen border-2">
      <div className="flex flex-col items-center h-[140px] bg-main-color">
        <PlaceSearchCategory />
        <PlaceSearchBar />
      </div>
      <PlaceSearchLists />
    </div>
  );
};

export default PlaceSearchArea;
