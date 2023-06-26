import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import { ReactComponent as Close } from "../../../assets/close.svg";
import { ReactComponent as Flag } from "../../../assets/flag.svg";
import useManageSchedule from "../../../hooks/useManageSchdule";
import { selecteStartPoint } from "../../../state/selectStartPoint";
import { sideBarState } from "../../../state/sidebarState";
import { schedule } from "../../../store/schedule";
import { selectedDay } from "../../../store/selectedDay";

interface IDestination {
  destinationId: number;
  destinationAddress: string;
  destinationCategoryCode: string;
  destinationName: string;
  lat: number;
  lng: number;
  seq: number;
}

const ExistsSchedule = () => {
  const scheduleBytDate = useRecoilValue(schedule);
  const selectedDate = useRecoilValue(selectedDay);
  const setStartPoint = useSetRecoilState(selecteStartPoint);
  const [sideBarOpenState, setSidebarOpenState] = useRecoilState(sideBarState);
  const { deleteDestination } = useManageSchedule();
  const [selectStartPoint, setSelecteStartPoint] = useState(false);

  const onClickSelectStartPointHandler = () => {
    setSelecteStartPoint(!selectStartPoint);
  };

  const onClickSelectHandler = (destination: IDestination) => {
    Swal.fire({
      icon: "question",
      text: "해당 목적지를 출발지로 선택하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setStartPoint({
          lng: destination.lng,
          lat: destination.lat,
          planDate: selectedDate.planDate,
        });
        setSelecteStartPoint(false);
      }
    });
  };

  const onClickaddPlaceHandler = () => {
    if (!sideBarOpenState.placeSearch) {
      setSidebarOpenState({ ...sideBarOpenState, placeSearch: true });
    }
  };

  const onClickDeletePlaceHandler = (destinationId: number) => {
    deleteDestination(destinationId);
  };

  return (
    <div className="shadow-md">
      <div className="flex justify-between mt-4 mb-3 ml-4">
        <button
          className="flex items-center px-3 py-2 bg-blue-001 hover:bg-blue-003 rounded-full font-bold text-[0.8rem] text-white"
          onClick={onClickSelectStartPointHandler}
          type="button"
        >
          <Flag className="mr-1 w-[16px] h-[16px] fill-white" />
          {!selectStartPoint ? "출발지 선택" : "출발지 선택 해제"}
        </button>
        <button
          type="button"
          className="mr-4 px-3 py-2 bg-orange-001 hover:bg-orange-003 rounded-full font-bold text-sm text-white"
          onClick={onClickaddPlaceHandler}
        >
          장소추가
        </button>
      </div>
      <div className="flex flex-col items-center h-[31rem] overflow-y-auto">
        {scheduleBytDate !== "" &&
          scheduleBytDate.destinationDtoList.map((destination) => (
            <div
              key={destination.destinationId}
              className="flex items-center"
            >
              {selectStartPoint && (
                <button
                  className="mt-4 mr-2 text-sm text-black-003 hover:text-blue-001 cursor-pointer"
                  onClick={() => onClickSelectHandler(destination)}
                  type="button"
                >
                  선택
                </button>
              )}
              <div
                key={destination.destinationId}
                className="relative mt-4 px-3 py-4 w-[17rem] bg-white border border-gray-003 rounded-md shadow-md"
              >
                <p className="text-[1.2rem] font-[500]">
                  {destination.destinationName}
                </p>
                <p className="mt-1 text-[0.8rem] font-light">
                  {destination.destinationAddress}
                </p>
                <div>
                  <button
                    type="button"
                    className="absolute top-3 right-3 w-[10px] h-[10px]"
                    onClick={() =>
                      onClickDeletePlaceHandler(destination.destinationId)
                    }
                  >
                    <Close className="w-[10px] h-[10px] fill-red-001" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExistsSchedule;
