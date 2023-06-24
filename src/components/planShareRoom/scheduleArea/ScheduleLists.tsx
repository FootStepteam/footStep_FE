import { useRecoilValue } from "recoil";
import { schedule } from "../../../store/schedule";
import { selectedDay } from "../../../store/selectedDay";
import ExistsSchedule from "./ExistsSchedule";
import NotExistsSchedule from "./NotExistsSchedule";
import Swal from "sweetalert2";
import { travelDate } from "../../../state/travelDate";

const ScheduleLists = () => {
  const travelDates = useRecoilValue(travelDate);
  const scheduleList = useRecoilValue(schedule);
  const selectedDate = useRecoilValue(selectedDay);
  const isExists =
    scheduleList[selectedDate.planDay - 1] !== undefined &&
    scheduleList[selectedDate.planDay - 1].destinationDtoList.length !== 0;

  const validation = () => {
    if (travelDates !== scheduleList.length) {
      return false;
    }

    scheduleList.forEach((schedule) => {
      if (schedule.destinationDtoList.length === 0) {
        return false;
      }
    });

    return true;
  };

  const onClickCompleteHandler = () => {
    !validation()
      ? Swal.fire({
          icon: "error",
          text: "모든 일차에 장소를 등록해야 일정 완료가 가능합니다.",
        })
      : Swal.fire({
          icon: "question",
          text: "일정완료를 하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        }).then((result) => {
          result.isConfirmed && console.log("일정완료");
        });
  };

  return (
    <>
      {isExists ? <ExistsSchedule /> : <NotExistsSchedule />}
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={onClickCompleteHandler}
          className="w-[17rem] h-[3rem] bg-platinum-001 hover:bg-platinum-002 rounded-sm font-DoHyeon text-xl text-white font-normal"
        >
          일정완료
        </button>
      </div>
    </>
  );
};

export default ScheduleLists;
