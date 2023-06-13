import { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { useRecoilState } from "recoil";
import { ReactComponent as CalendarIcon } from "../../../assets/blackCalendar.svg";
import { ReactComponent as BottomArrow } from "../../../assets/bottomArrow.svg";
import { createShareRoomFormValue } from "../../../store/createShareRoomFormValue";

interface ISelectedDates {
  startDate: Date;
  endDate: Date;
  printStartDate: string;
  printEndDate: string;
}

const PlanDate = () => {
  const [formValue, setFormValue] = useRecoilState(createShareRoomFormValue);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<ISelectedDates>({
    startDate: new Date(),
    endDate: new Date(),
    printStartDate: "",
    printEndDate: "",
  });
  const [nights, setNights] = useState<number>(0);

  const isSelected = selectedDates.printStartDate !== "";

  const nightsCalc = () => {
    const startDate = new Date(selectedDates.startDate);
    const endDate = new Date(selectedDates.endDate);

    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setNights(diff);
  };

  const onClickDateCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  const onChangeHandler = (value: Value) => {
    const startDate = value[0];
    const endDate = value[1];

    setSelectedDates({ ...selectedDates, startDate, endDate });
  };

  const onClickCompleteButtonHandler = () => {
    const submitStartDate = moment(selectedDates.startDate).format("YYYYMMDD");
    const submitEndDate = moment(selectedDates.endDate).format("YYYYMMDD");
    const printStartDate = moment(selectedDates.startDate).format("MM.DD");
    const printEndDate = moment(selectedDates.endDate).format("MM.DD");

    setSelectedDates({ ...selectedDates, printStartDate, printEndDate });

    nightsCalc();

    setFormValue({
      ...formValue,
      startDate: submitStartDate,
      endDate: submitEndDate,
    });
    setOpenCalendar(false);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center mt-6 w-[19rem] h-[3.5rem] border border-[#DCDCDC] rounded-md"
        onClick={onClickDateCalendar}
        role="presentation"
      >
        <CalendarIcon className="mx-4 w-[28px] h-[28px]" />
        <div className="grow flex justify-center mx-4 text-[#A5A5A5]">
          <p className="grow">
            {isSelected
              ? `${selectedDates.printStartDate} ~ ${selectedDates.printEndDate}`
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
              onClick={onClickCompleteButtonHandler}
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
