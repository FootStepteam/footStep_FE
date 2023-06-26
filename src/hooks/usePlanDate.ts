import moment from "moment";
import { useEffect, useState } from "react";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { INITIAL_SELECTED_DATES } from "../constants/initial";
import { IShareRoom } from "../type/shareRoom";
import { ISelectedDate } from "../type/shareRoomForm";
import { useSetRecoilState } from "recoil";
import { travelDate } from "../state/travelDate";

const usePlanDate = (
  type: string,
  editStatus: boolean,
  shareRoomInfo: IShareRoom
) => {
  const setTravelDate = useSetRecoilState(travelDate);
  const [night, setNight] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<ISelectedDate>(
    INITIAL_SELECTED_DATES
  );
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const calculateNights = () => {
    let startDate;
    let endDate;

    if (type === "inShareRoom") {
      if (selectedDate.init) {
        startDate = new Date(shareRoomInfo.travelStartDate);
        endDate = new Date(shareRoomInfo.travelEndDate);
        const printStartDate = moment(shareRoomInfo.travelStartDate).format(
          "MM.DD"
        );
        const printEndDate = moment(shareRoomInfo.travelEndDate).format(
          "MM.DD"
        );
        setSelectedDate({
          ...selectedDate,
          printStartDate,
          printEndDate,
          startDate,
          endDate,
          init: false,
        });
      } else {
        startDate = selectedDate.startDate;
        endDate = selectedDate.endDate;
      }
    } else {
      startDate = selectedDate.startDate;
      endDate = selectedDate.endDate;
    }

    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (openCalendar) {
      diff = diff - 1;
    }
    setNight(diff);

    if (!isNaN(diff)) {
      setTravelDate(diff + 1);
    }
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
    calculateNights();
  }, [shareRoomInfo]);

  useEffect(() => {
    if (!editStatus) {
      if (type === "inShareRoom") {
        const printStartDate = moment(shareRoomInfo.travelStartDate).format(
          "MM.DD"
        );
        const printEndDate = moment(shareRoomInfo.travelEndDate).format(
          "MM.DD"
        );
        const startDate = new Date(shareRoomInfo.travelStartDate);
        const endDate = new Date(shareRoomInfo.travelEndDate);
        let diff = Math.abs(endDate.getTime() - startDate.getTime());
        diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

        setNight(diff);
        setSelectedDate({ ...selectedDate, printStartDate, printEndDate });
      }
      setOpenCalendar(false);
    }
  }, [editStatus]);

  return {
    night,
    selectedDate,
    openCalendar,
    onChangeHandler,
    onClickCompleteButtonHandler,
    onClickDateCalendar,
  } as const;
};

export default usePlanDate;
