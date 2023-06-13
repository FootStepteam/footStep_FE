import { ReactComponent as SearchIcon } from "../../../../assets/search.svg";

const PlaceSearchBar = () => {
  return (
    <div className="flex justify-center items-center mt-4 mx-auto w-[20rem] h-[3rem] bg-white rounded-sm shadow-lg">
      <input
        type="text"
        placeholder="장소, 주소 검색"
        className="grow pl-4 py-2 outline-none placeholder:text-sm"
      />
      <SearchIcon className="mx-4 w-[18px] h-[18px]" fill="#A5A5A5" />
    </div>
  );
};

export default PlaceSearchBar;
