import { IShareRoom } from "../type/shareRoom";

interface IPlanDates {
  month: number;
  date: number;
  day: string;
  planDay: number;
  planDate: string;
}

const setDay = (startDay: number, index: number) => {
  const newDay = (startDay + (index - 1)) % 6;

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

  return day;
};

export const calculateDays = (getShareRoomInfo: IShareRoom) => {
  let selectedDate = {
    month: 1,
    date: 1,
    day: "",
    planDay: 1,
    planDate: "",
  };

  let planDates = [];

  const newStartDate = new Date(getShareRoomInfo.travelStartDate);
  const newEndDate = new Date(getShareRoomInfo.travelEndDate);

  let year = newStartDate.getFullYear();
  let month = newStartDate.getMonth();
  let date = newStartDate.getDate();
  const day = newStartDate.getDay();

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  let diff = Math.abs(newStartDate.getTime() - newEndDate.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

  for (let i = 0; i < diff; i++) {
    const newDay = setDay(day, i);

    if (isLeapYear) {
      if (date + i === 30) {
        date = 1;
        month = month + 1;
      } else {
        date = date + i;
      }
    } else {
      if (date + i === 29) {
        date = 1;
        month = month + 1;
      } else {
        date = date + i;
      }
    }

    if (month === 12) {
      year = year + 1;
      month = 0;
    }

    const newMonth = String(month).length === 1 ? `0${month + 1}` : month + 1;

    const dateInfo: IPlanDates = {
      month: month + 1,
      date,
      day: newDay,
      planDay: i + 1,
      planDate: `${year}-${newMonth}-${date}`,
    };

    if (i === 0) {
      selectedDate = dateInfo;
    }

    planDates.push(dateInfo);
  }

  return { selectedDate, planDates };
};
