import { useEffect, useState } from "react";
import { ReactComponent as BottomArrow } from "../../../assets/bottomArrow.svg";
import { shareRoomInfo } from "../../../store/shareRoomInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { calculateDays } from "../../../utils/calculateDays";
import { selectedDay } from "../../../store/selectedDay";

interface IPlanDates {
  month: number;
  date: number;
  day: string;
  planDay: number;
  planDate: string;
}

const ScheduleDaySelect = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDay);
  const [daysOpenState, setDaysOpenState] = useState<boolean>(false);
  const [planDates, setPlanDates] = useState<IPlanDates[]>([]);

  const getShareRoomInfo = useRecoilValue(shareRoomInfo);

  const onClickDaysHandler = () => {
    setDaysOpenState(!daysOpenState);
  };

  const onClickselectDay = (day: number) => {
    setSelectedDate(planDates[day - 1]);
    setDaysOpenState(false);
  };

  useEffect(() => {
    const result = calculateDays(getShareRoomInfo);
    setSelectedDate(result.selectedDate);
    setPlanDates(result.planDates);
  }, [getShareRoomInfo]);

  return (
    <div>
      <div className="flex items-center ml-12">
        <p className="ml-2 font-Jua font-normal text-3xl">
          {selectedDate.planDay}일차
        </p>
        <p className="flex items-end  ml-3 pt-1 font-Jua text-gray-001">
          {selectedDate.month}월 {selectedDate.date}일 ({selectedDate.day})
        </p>
        <button
          type="button"
          className={`${
            planDates.length === 0 ? "hidden" : "ml-2 pt-[0.5rem]"
          }`}
          onClick={onClickDaysHandler}
        >
          <BottomArrow
            className={`border-2 rounded-full origin-center ${
              daysOpenState ? "rotate-180" : "rotate-360"
            }`}
            width={20}
            height={20}
          />
        </button>
      </div>
      <div
        className={`flex flex-col justify-center items-center absolute left-0 py-4 w-planShareRoomSideBar bg-white z-[1020] ${
          daysOpenState
            ? "visible min-h-20 mt-4 shadow-lg"
            : "invisible h-0 text-white"
        }`}
      >
        {planDates.map((date) => (
          <div
            key={date.planDay}
            className={"px-4 py-2 w-[12rem] cursor-pointer"}
            onClick={() => onClickselectDay(date.planDay)}
          >
            <p className="text-sm">
              <span className="mr-4 font-bold">{date.planDay}일차 </span>
              <span
                className={`${
                  selectedDate.planDay === date.planDay
                    ? "text-blue-003 font-medium"
                    : "text-black-003"
                }`}
              >
                {date.month}월 {date.date}일 ({date.day})
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDaySelect;
