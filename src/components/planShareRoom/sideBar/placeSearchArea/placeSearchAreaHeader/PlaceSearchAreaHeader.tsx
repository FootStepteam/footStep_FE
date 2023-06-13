import PlaceSearchBar from "./PlaceSearchBar";
import PlaceSearchCategory from "./PlaceSearchCategory";
import PlaceSearchTitle from "./PlaceSearchTitle";

const PlaceSearchAreaHeader = () => {
  return (
    <div className="flex flex-col w-[25rem] h-[14rem] bg-[#00AFFF]">
      <PlaceSearchTitle />
      <PlaceSearchCategory />
      <PlaceSearchBar />
    </div>
  );
};

export default PlaceSearchAreaHeader;
