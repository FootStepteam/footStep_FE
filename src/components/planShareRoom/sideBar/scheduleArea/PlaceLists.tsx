const PlaceLists = () => {
  return (
    <div className="mt-[80px]">
      <div className="flex flex-col items-center justify-center text-[#A5A5A5] text-xl font-[500]">
        <p className="my-1">추가된 장소가 없습니다.</p>
        <p className="my-1">방문할 장소를 추가해보세요 !</p>
      </div>
      <button
        type="button"
        className="flex my-8 mx-auto px-8 py-6 rounded-3xl bg-[#DCDCDC] text-2xl text-white font-bold"
      >
        + 장소추가
      </button>
    </div>
  );
};

export default PlaceLists;
