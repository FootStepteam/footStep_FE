const PlanListHeader = () => {
  return (
    <div className="m-center pt-8 w-commonSection">
      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="px-4 py-3 float-right bg-main-color rounded-xl font-bold text-white "
        >
          방 생성하기
        </button>
      </div>
      <div className="mt-8">
        <p className="text-xl font-bold">참여중인 여행 일정 계획</p>
      </div>
    </div>
  );
};

export default PlanListHeader;
