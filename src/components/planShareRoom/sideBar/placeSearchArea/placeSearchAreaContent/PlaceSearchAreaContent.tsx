import PlaceSearchLists from "./PlaceSearchLists";

const PlaceSearchAreaContent = () => {
  return (
    <div className="w-planShareRoomSideBar h-planShareRoomContent">
      <button type="button" className="justify-end">
        장소 추천
      </button>
      <PlaceSearchLists />
    </div>
  );
};

export default PlaceSearchAreaContent;
