import { ReactComponent as BottomArrow } from "../../../../assets/bottomArrow.svg";

const DaySelect = () => {
  return (
    <div className="flex items-center mt-12 ml-12">
      <p className="ml-2 text-[24px] font-bold">1일차</p>
      <p className="flex items-end  ml-2 text-placeholder-color text-[16px]">
        1월 1일(일)
      </p>
      <button type="button" className="">
        <BottomArrow className="border-2 rounded-full" />
      </button>
    </div>
  );
};

export default DaySelect;