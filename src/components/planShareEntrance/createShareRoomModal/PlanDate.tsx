import { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { ReactComponent as CalendarIcon } from "../../../assets/blackCalendar.svg";
import { ReactComponent as BottomArrow } from "../../../assets/bottomArrow.svg";

const PlanDate = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [finallyDates, setFinallyDates] = useState<string[]>([]);
  const [nights, setNights] = useState<number>(0);

  const isSelected = finallyDates.length !== 0;
  const nightsCalc = () => {
    const startDay = Number(finallyDates[0].slice(3, 5));
    const endDay = Number(finallyDates[1].slice(3, 5));
    let calcNightsResult = 0;

    if (startDay > endDay) {
      calcNightsResult = startDay - endDay;
    } else {
      calcNightsResult = endDay - startDay;
    }

    setNights(calcNightsResult);
  };

  useEffect(() => {
    if (finallyDates.length !== 0) {
      nightsCalc();
    }
  }, [finallyDates]);

  const clickDateCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  const onChangeHandler = (value: Value) => {
    const startDate = moment(value[0]).format("MM.DD");
    const endDate = moment(value[1]).format("MM.DD");
    setSelectedDates([startDate, endDate]);
  };

  const clickSelectButtonHandler = () => {
    setFinallyDates(selectedDates);
    setOpenCalendar(false);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center mt-6 w-[19rem] h-[3.5rem] border border-[#DCDCDC] rounded-md"
        onClick={clickDateCalendar}
        role="presentation"
      >
        <CalendarIcon className="mx-4 w-[28px] h-[28px]" />
        <div className="grow flex justify-center mx-4 text-[#A5A5A5]">
          <p className="grow">
            {isSelected
              ? `${finallyDates[0]} ~ ${finallyDates[1]}`
              : "일자를 선택해주세요."}
          </p>
          {nights !== 0 && <p>{`${nights}박`}</p>}
        </div>
        <BottomArrow className="mx-4 w-[25px] h-[25px]" />
      </div>
      {openCalendar && (
        <div className="absolute top-[5.5rem]">
          <Calendar
            onChange={onChangeHandler}
            calendarType="US"
            selectRange
            returnValue="range"
            formatDay={(_locale, date) => moment(date).format("D")}
          />
          <div className="flex justify-center items-center w-[350px] h-[4rem] border-x border-[#A5A5A5] rounded-b-md bg-white box-border">
            <button
              type="button"
              className="w-[13rem] h-[2.8rem] bg-[#00AFFF] hover:bg-[] rounded-md text-[1.4rem] text-white"
              onClick={clickSelectButtonHandler}
            >
              선택완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDate;
