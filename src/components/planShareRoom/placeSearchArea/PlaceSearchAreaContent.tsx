import PlaceSearchLists from "./PlaceSearchLists";

const PlaceSearchAreaContent = () => {
  return (
    <div className="flex flex-col w-[23rem] h-[calc(100vh-15rem)]">
      <div className="flex justify-end items-center mt-6 mr-4">
        <input type="checkbox" id="recommend" className="mr-2 w-4 h-4 checked:bg-orange-001"/>
        <label htmlFor="recommend" className="text-[0.8rem]">장소추천받기</label>
      </div>
      <PlaceSearchLists />
    </div>
  );
};

export default PlaceSearchAreaContent;
