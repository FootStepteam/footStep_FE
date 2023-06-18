import { ReactComponent as Related } from "../../../assets/markerRelated.svg";

const PlaceSearchTitle = () => {
  return (
    <div className="flex items-center mt-4 ml-6">
      <p className="mr-2 text-white text-lg font-bold">장소검색</p>
      <Related width={30} height={30} />
    </div>
  );
};

export default PlaceSearchTitle;
