import { IPropsPlaceSearch } from "../../../../../type/shareRoom";
import PlaceSearchBar from "./PlaceSearchBar";
import PlaceSearchCategory from "./PlaceSearchCategory";
import PlaceSearchTitle from "./PlaceSearchTitle";

const PlaceSearchAreaHeader = ({ placeSearch }: IPropsPlaceSearch) => {
  return (
    <div className="flex flex-col w-planShareRoomSideBar h-planShareRoomHeader bg-[#00AFFF]">
      <PlaceSearchTitle />
      <PlaceSearchCategory />
      <PlaceSearchBar placeSearch={placeSearch} />
    </div>
  );
};

export default PlaceSearchAreaHeader;
