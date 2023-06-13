import { ReactComponent as BottomArrow } from "../../assets/bottomArrow.svg";

const SideBar = () => {
  return (
    <div className="absolute left-0 top-0 w-[25rem] min-h-screen border-2">
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
      <div className="mt-4">
        <div className="flex justify-center">
          <button type="button" className="">
            <BottomArrow className="border-2 rounded-full" />
          </button>
          <p className="ml-2 text-[24px] font-bold">1일차</p>
          <p className="flex items-end  ml-2 text-placeholder-color text-[16px]">
            1월 1일(일)
          </p>
        </div>
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
      </div>
    </div>
  );
};

export default SideBar;
