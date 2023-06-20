import { IPropsPlaceSearch } from "../../../type/shareRoom";
import PlaceSearchBar from "./PlaceSearchBar";
import PlaceSearchCategory from "./PlaceSearchCategory";
import PlaceSearchTitle from "./PlaceSearchTitle";

const PlaceSearchAreaHeader = ({ placeSearch }: IPropsPlaceSearch) => {
  return (
    <div className="flex flex-col w-planShareRoomSideBar h-planShareRoomHeader bg-blue-004">
      <PlaceSearchTitle />
      <PlaceSearchCategory placeSearch={placeSearch} />
      <PlaceSearchBar placeSearch={placeSearch} />
    </div>
  );
};

export default PlaceSearchAreaHeader;
