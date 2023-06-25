import { useRecoilState, useRecoilValue } from "recoil";
import { schedule } from "../../../store/schedule";
import { selectedDay } from "../../../store/selectedDay";
import ExistsSchedule from "./ExistsSchedule";
import NotExistsSchedule from "./NotExistsSchedule";
import Swal from "sweetalert2";
import { travelDate } from "../../../state/travelDate";
import {
  initialValue,
  selecteStartPoint,
} from "../../../state/selectStartPoint";
import { recommendScheduleAPI } from "../../../api/recommendAPI";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as Recommend } from "../../../assets/arrowDirection.svg";

const ScheduleLists = () => {
  const { shareRoomID } = useParams();
  const travelDates = useRecoilValue(travelDate);
  const scheduleList = useRecoilValue(schedule);
  const selectedDate = useRecoilValue(selectedDay);
  const [selectedStartPoint, setSelectedStartPoint] =
    useRecoilState(selecteStartPoint);
  const isExists =
    scheduleList[selectedDate.planDay - 1] !== undefined &&
    scheduleList[selectedDate.planDay - 1].destinationDtoList.length !== 0;

  const validation = (type: string) => {
    if (type === "complete") {
      if (travelDates !== scheduleList.length) {
        return false;
      }

      scheduleList.forEach((schedule) => {
        if (schedule.destinationDtoList.length === 0) {
          return false;
        }
      });
    } else if (type === "recommend") {
      if (
        selectedStartPoint.planDate === "" &&
        selectedStartPoint.lat === 0 &&
        selectedStartPoint.lng === 0
      ) {
        return false;
      }
    }

    return true;
  };

  const onClickRecommendHandler = () => {
    !validation("recommend")
      ? Swal.fire({
          icon: "error",
          text: "출발지를 선택해야 합니다.",
        })
      : Swal.fire({
          icon: "question",
          text: "추천경로로 일정을 순서를 변경하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        }).then((result) => {
          result.isConfirmed &&
            recommendScheduleAPI(selectedStartPoint, Number(shareRoomID));
        });
  };

  const onClickCompleteHandler = () => {
    !validation("complete")
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

  useEffect(() => {
    setSelectedStartPoint(initialValue);
  }, []);

  return (
    <>
      {isExists ? <ExistsSchedule /> : <NotExistsSchedule />}
      <div className="flex flex-col justify-center items-center mt-8">
        <button
          type="button"
          onClick={onClickRecommendHandler}
          className="flex justify-center items-center w-[17rem] h-[3rem] bg-yellow-001 hover:bg-yellow-003 rounded-sm font-DoHyeon text-xl text-white font-normal"
        >
          <Recommend className="mr-2 w-[20px] h-[20px] fill-white" />
          추천경로 일정설정
        </button>
        <button
          type="button"
          onClick={onClickCompleteHandler}
          className="mt-2 w-[17rem] h-[3rem] bg-platinum-001 hover:bg-platinum-002 rounded-sm font-DoHyeon text-xl text-white font-normal"
        >
          일정완료
        </button>
      </div>
    </>
  );
};

export default ScheduleLists;
