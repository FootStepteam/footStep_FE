const PlaceLists = () => {
  return (
    <div className="mt-[80px]">
      <p className="flex justify-center text-placeholder-color">
        방문할 장소를 추가해!
      </p>
      <button
        type="button"
        className="flex mt-4 mx-auto px-4 py-2 rounded-lg bg-main-color"
      >
        + 장소추가
      </button>
    </div>
  );
};

export default PlaceLists;
