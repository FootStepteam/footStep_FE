import { useEffect, useState } from "react";
import { ReactComponent as BottomArrow } from "../../../assets/bottomArrow.svg";
import { shareRoomInfo } from "../../../store/shareRoomInfo";
import { useRecoilValue } from "recoil";

interface IPlanDates {
  month: number;
  date: number;
  day: string;
  planDay: number;
}

const ScheduleDaySelect = () => {
  const [daysOpenState, setDaysOpenState] = useState<boolean>(false);
  const [planDates, setPlanDates] = useState<IPlanDates[]>([]);
  const [selectedDate, setSelectedDate] = useState<IPlanDates>({
    month: 1,
    date: 1,
    day: "일",
    planDay: 1,
  });

  const getShareRoomInfo = useRecoilValue(shareRoomInfo);

  const onClickDaysHandler = () => {
    setDaysOpenState(!daysOpenState);
  };

  const onClickselectDay = (day: number) => {
    setSelectedDate(planDates[day - 1]);
  };

  const dayCalc = () => {
    const start = getShareRoomInfo.travelStartDate;
    const end = getShareRoomInfo.travelEndDate;

    const newStartDate = new Date(start);
    const newEndDate = new Date(end);

    const startMonth = newStartDate.getMonth() + 1;
    const startDate = newStartDate.getDate();
    const startDay = newStartDate.getDay();

    let diff = Math.abs(newStartDate.getTime() - newEndDate.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const dateArr = [];

    for (let i = 1; i <= diff; i++) {
      const newDay = (startDay + (i - 1)) % 6;
      let day = "";
      switch (newDay) {
        case 0:
          day = "일";
          break;
        case 1:
          day = "월";
          break;
        case 2:
          day = "화";
          break;
        case 3:
          day = "수";
          break;
        case 4:
          day = "목";
          break;
        case 5:
          day = "금";
          break;
        case 6:
          day = "토";
          break;
      }

      const dateInfo: IPlanDates = {
        month: startMonth,
        date: startDate + (i - 1),
        day,
        planDay: i,
      };
      if (i === 1) {
        setSelectedDate(dateInfo);
      }
      dateArr.push(dateInfo);
    }
    setPlanDates(dateArr);
  };

  useEffect(() => {
    dayCalc();
  }, [getShareRoomInfo]);

  return (
    <div>
      <div className="flex items-center mt-12 ml-12">
        <p className="ml-2 text-[24px] font-bold">{selectedDate.planDay}일차</p>
        <p className="flex items-end  ml-3 pt-1 text-gray-001">
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
            className={`border-2 rounded-full origin-center ${daysOpenState ? "rotate-180" : "rotate-360"}`}
            width={20}
            height={20}
          />
        </button>
      </div>
      <div
        className={`flex flex-col justify-center items-center py-4 bg-white ${
          daysOpenState
            ? "visible min-h-20 mt-4 shadow-[rgba(0, 0, 0, 0.1) 0px 4px 12px]"
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
                <span className="mr-4 font-bold">{date.planDay}일차 </span><span className={`${selectedDate.planDay === date.planDay ?
              "text-blue-003 font-medium" : "text-black-003"}`}>{date.month}월 {date.date}일 ({date.day})</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDaySelect;
