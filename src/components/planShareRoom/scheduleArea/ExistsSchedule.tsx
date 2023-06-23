import { useRecoilState } from "recoil";
import { schedule } from "../../../store/schedule";

const ExistsSchedule = () => {
  const [scheduleList, setScheduleList] = useRecoilState(schedule);

  return (
    <>
      {scheduleList.map((schedule) => (
        <div className="flex flex-col items-center">
          {schedule.destinationDtoList.map((item) => (
            <div className="mt-4 px-3 py-4 w-[17rem] bg-white border border-gray-003 rounded-md shadow-md">
              <p className="text-[1.2rem] font-[500]">{item.destinationName}</p>
              <p className="mt-1 text-[0.8rem] font-light">
                {item.destinationAddress}
              </p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default ExistsSchedule;
