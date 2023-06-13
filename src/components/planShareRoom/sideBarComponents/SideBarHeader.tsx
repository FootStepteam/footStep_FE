const SideBarHeader = () => {
  return (
    <div className="h-[140px] bg-main-color">
      <button type="button" className="ml-2 mt-2">
        뒤로가기
      </button>
      <div className="flex justify-center font-bold text-[32px] text-white-color">
        title title title
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex justify-center p-2 w-1/3 bg-white-color text-[14px] border-r-2 rounded-l-lg">
          23.01.01(일)
        </div>
        <div className="flex justify-center p-2 w-1/3 bg-white-color text-[14px] rounded-r-lg">
          23.01.04(수)
        </div>
        <button
          type="button"
          className="px-2 ml-2 text-[12px] font-medium bg-white-color rounded-full"
        >
          변경
        </button>
      </div>
    </div>
  );
};

export default SideBarHeader;
