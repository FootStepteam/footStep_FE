import { useEffect, useState } from 'react';
import { ReactComponent as BottomArrow } from '../../../../assets/bottomArrow.svg';
import { shareRoomInfo } from '../../../../store/shareRoomInfo';
import { useRecoilValue } from 'recoil';

interface IPlanDates {
  month: number
  date: number
  day: string
  planDay: number
}

const DaySelect = () => {
  const [daysOpenState, setDaysOpenState] = useState<boolean>(false);
  const [planDates, setPlanDates] = useState<IPlanDates[]>([]);
  const [selectedDate, setSelectedDate] = useState<IPlanDates>({
    month: 1,
    date: 1,
    day: "일",
    planDay: 1
  });
  
  const getShareRoomInfo = useRecoilValue(shareRoomInfo);

  const onClickDaysHandler = () => {
    setDaysOpenState(!daysOpenState);
  };

  const onClickselectDay = (day:number) => {
    setSelectedDate(planDates[day-1]);
  }

  const dayCalc = () => {
    
    const start = getShareRoomInfo.travelStartDate;
    const end = getShareRoomInfo.travelEndDate;

    const newStartDate = new Date(start);
    const newEndDate = new Date(end);

    const startMonth = newStartDate.getMonth() + 1;
    // const endMonth = newEndDate.getMonth() + 1;
    const startDate = newStartDate.getDate();
    // const endDate = newEndDate.getDate();
    const startDay = newStartDate.getDay();

    let diff = Math.abs(newStartDate.getTime() - newEndDate.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const dateArr = [];

    for (let i = 1; i <= diff; i++) {
      const newDay = (startDay + (i - 1)) % 6;
      let day = "";
      switch(newDay){
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

      const dateInfo:IPlanDates = {
        month: startMonth,
        date: startDate + (i - 1),
        day,
        planDay: i
      }
      if(i === 1){
        setSelectedDate(dateInfo);
      }
      dateArr.push(dateInfo)
    }
    setPlanDates(dateArr);
  }

  useEffect(() => {
    dayCalc();
  }, [getShareRoomInfo]);

  return (
    <div>
      <div className="flex items-center mt-12 ml-12">
        <p className="ml-2 text-[24px] font-bold">{selectedDate.planDay}일차</p>
        <p className="flex items-end  ml-3 pt-1 text-gray-001">{selectedDate.month}월 {selectedDate.date}일 ({selectedDate.day})</p>
        <button
          type="button"
          className={`${planDates.length === 0 ? "hidden" : "ml-2 pt-[0.5rem]"}`}
          onClick={onClickDaysHandler}
        >
          <BottomArrow className="border-2 rounded-full" width={20} height={20}/>
        </button>
      </div>
      <div className={`${daysOpenState ? 'flex justify-center mt-4 border-y border-y-gray-003' : 'hidden'}`}>
        {planDates.map((date) => (
          <p className={`px-4 py-2 cursor-pointer ${selectedDate.planDay === date.planDay && "text-blue-003 font-medium border-b-2 border-b-blue-003"}`} onClick={() => onClickselectDay(date.planDay)}>{date.planDay}일차</p>
        ))}
      </div>
      <input type="text" value={getShareRoomInfo.travelStartDate} />
    </div>
  );
};

export default DaySelect;
