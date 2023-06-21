import moment from "moment";
import { useEffect, useState } from "react";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { IShareRoom } from "../type/shareRoom";
import { ISelectedDate } from "../type/shareRoomForm";
import { INITIAL_SELECTED_DATES } from "../constants/initial";

const usePlanDate = (
  type: string,
  editStatus: boolean,
  shareRoomInfo: IShareRoom
) => {
  const [night, setNight] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<ISelectedDate>(
    INITIAL_SELECTED_DATES
  );
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const calculateNights = () => {
    let startDate;
    let endDate;

    if (type === "get") {
      startDate = new Date(shareRoomInfo.travelStartDate);
      endDate = new Date(shareRoomInfo.travelEndDate);
      const printStartDate = moment(shareRoomInfo.travelStartDate).format(
        "MM.DD"
      );
      const printEndDate = moment(shareRoomInfo.travelEndDate).format("MM.DD");
      setSelectedDate({ ...selectedDate, printStartDate, printEndDate });
    } else {
      startDate = new Date(selectedDate.startDate);
      endDate = new Date(selectedDate.endDate);
    }

    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setNight(diff);
  };

  const onChangeHandler = (value: Value) => {
    const startDate = value[0];
    const endDate = value[1];
    setSelectedDate({ ...selectedDate, startDate, endDate });
  };

  const onClickCompleteButtonHandler = () => {
    const submitStartDate = moment(selectedDate.startDate).format("YYYY-MM-DD");
    const submitEndDate = moment(selectedDate.endDate).format("YYYY-MM-DD");
    const printStartDate = moment(selectedDate.startDate).format("MM.DD");
    const printEndDate = moment(selectedDate.endDate).format("MM.DD");

    calculateNights();
    setSelectedDate({
      ...selectedDate,
      printStartDate,
      printEndDate,
      submitStartDate,
      submitEndDate,
    });
    setOpenCalendar(false);
  };

  const onClickDateCalendar = () => {
    if (editStatus) {
      setOpenCalendar(!openCalendar);
    }
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    calculateNights();
  }, [shareRoomInfo]);

  useEffect(() => {
    if (!editStatus) {
      setOpenCalendar(false);
    }
  }, [editStatus]);

  return [
    night,
    selectedDate,
    openCalendar,
    onChangeHandler,
    onClickCompleteButtonHandler,
    onClickDateCalendar,
  ] as const;
};

export default usePlanDate;
