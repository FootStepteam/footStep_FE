import PlaceSearchAreaHeader from "./placeSearchAreaHeader/PlaceSearchAreaHeader";
import PlaceSearchAreaContent from "./placeSearchAreaContent/PlaceSearchAreaContent";
import { IPropsPlaceSearch } from "../../../../type/shareRoom";

const PlaceSearchArea = ({ placeSearch }: IPropsPlaceSearch) => {
  return (
    <div>
      <PlaceSearchAreaHeader placeSearch={placeSearch} />
      <PlaceSearchAreaContent />
    </div>
  );
};

export default PlaceSearchArea;
