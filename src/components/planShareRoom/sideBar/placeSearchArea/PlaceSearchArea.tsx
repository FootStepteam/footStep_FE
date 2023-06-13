import PlaceSearchCategory from "./PlaceSearchCategory";
import PlaceSearchBar from "./PlaceSearchBar";
import PlaceSearchLists from "./PlaceSearchLists";

const PlaceSearchArea = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center h-[140px] bg-[#00AFFF]">
        <PlaceSearchBar />
        <PlaceSearchCategory />
      </div>
      <PlaceSearchLists />
    </div>
  );
};

export default PlaceSearchArea;
