import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { recommendScheduleAPI } from "../../../api/recommendAPI";
import { getScheduleAPI, getScheduleByDateAPI } from "../../../api/scheduleAPI";
import { ReactComponent as Recommend } from "../../../assets/arrowDirection.svg";
import {
  initialValue,
  selecteStartPoint,
} from "../../../state/selectStartPoint";
import { travelDate } from "../../../state/travelDate";
import { ISchedule, schedule } from "../../../store/schedule";
import { selectedDay } from "../../../store/selectedDay";
import { shareRoomInfo } from "../../../store/shareRoomInfo";
import ExistsSchedule from "./ExistsSchedule";
import NotExistsSchedule from "./NotExistsSchedule";

const ScheduleLists = () => {
  const { shareRoomID } = useParams();
  const travelDates = useRecoilValue(travelDate);
  const [scheduleInfo, setScheduleInfo] = useRecoilState(schedule);
  const selectedPlanDay = useRecoilValue(selectedDay);
  const shareRoom = useRecoilValue(shareRoomInfo);
  const [selectedStartPoint, setSelectedStartPoint] =
    useRecoilState(selecteStartPoint);

  const isExists =
    scheduleInfo !== "" && scheduleInfo.destinationDtoList.length !== 0;

  const validation = async (type: string) => {
    if (type === "complete") {
      const response = await getScheduleAPI(
        Number(shareRoomID),
        shareRoom.travelStartDate,
        shareRoom.travelEndDate
      );

      const data = response?.data;

      if (data !== undefined) {
        if (travelDates !== data.length) {
          console.log("asd");
          return false;
        }

        data.forEach((destination: ISchedule) => {
          if (destination.destinationDtoList.length === 0) {
            return false;
          }
        });
      }
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

  const onClickRecommendHandler = async () => {
    const result = await validation("recommend");

    !result
      ? Swal.fire({
          icon: "error",
          text: "출발지를 선택해야 합니다.",
        })
      : Swal.fire({
          icon: "question",
          title: `${selectedPlanDay.planDay}일차`,
          text: `경로를 추천경로로 일정 순서를 변경하시겠습니까?`,
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            recommendScheduleAPI(selectedStartPoint, Number(shareRoomID));
            Swal.fire({
              icon: "success",
              text: "추천 경로로 일정이 설정되었습니다.",
            });
          }
        });
  };

  const onClickCompleteHandler = async () => {
    const result = await validation("complete");

    !result
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

  const getScheduleByDate = async () => {
    const initialPlanDate = shareRoom.travelStartDate;
    const response = await getScheduleByDateAPI(
      Number(shareRoomID),
      initialPlanDate
    );
    setScheduleInfo(response?.data);
  };

  useEffect(() => {
    setSelectedStartPoint(initialValue);
  }, []);

  useEffect(() => {
    const initialPlanDate = shareRoom.travelStartDate;

    if (initialPlanDate !== "") {
      getScheduleByDate();
    }
  }, [shareRoom]);

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
