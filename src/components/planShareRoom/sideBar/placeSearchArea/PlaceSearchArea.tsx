import PlaceSearchCategory from "./PlaceSearchCategory";
import PlaceSearchBar from "./PlaceSearchBar";
import PlaceSearchLists from "./PlaceSearchLists";
import PlaceSearchTitle from "./PlaceSearchTitle";

const PlaceSearchArea = () => {
  return (
    <>
      <div className="flex flex-col w-[25rem] bg-[#00AFFF]">
        <PlaceSearchTitle />
        <PlaceSearchCategory />
        <PlaceSearchBar />
      </div>
      <PlaceSearchLists />
    </>
  );
};

export default PlaceSearchArea;
