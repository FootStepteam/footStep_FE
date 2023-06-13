const PlaceSearchBar = () => {
  return (
    <div className="flex justify-center w-2/3 mt-2">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-2/3 pl-4 py-2 rounded-l-lg"
      />
      <button
        type="button"
        className="px-2 bg-white-color border-l-2 rounded-r-lg"
      >
        검색
      </button>
    </div>
  );
};

export default PlaceSearchBar;
