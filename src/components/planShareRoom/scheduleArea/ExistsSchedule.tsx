import { useRecoilState, useRecoilValue } from "recoil";
import { ReactComponent as Close } from "../../../assets/close.svg";
import useManageSchedule from "../../../hooks/useManageSchdule";
import { sideBarState } from "../../../state/sidebarState";
import { schedule } from "../../../store/schedule";
import { selectedDay } from "../../../store/selectedDay";

const ExistsSchedule = () => {
  const scheduleList = useRecoilValue(schedule);
  const selectedDate = useRecoilValue(selectedDay);
  const [sideBarOpenState, setSidebarOpenState] = useRecoilState(sideBarState);
  const { deleteDestination } = useManageSchedule();

  const onClickaddPlaceHandler = () => {
    if (!sideBarOpenState.placeSearch) {
      setSidebarOpenState({ ...sideBarOpenState, placeSearch: true });
    }
  };

  const onClickDeletePlaceHandler = (destinationId: string) => {
    deleteDestination(destinationId);
  };

  return (
    <>
      <div className="flex flex-row-reverse my-3">
        <button
          type="button"
          className="mr-8 px-3 py-2 bg-orange-001 hover:bg-orange-003 rounded-full font-bold text-sm text-white"
          onClick={onClickaddPlaceHandler}
        >
          장소추가
        </button>
      </div>
      <div className="flex flex-col items-center h-[31rem] overflow-y-auto">
        {scheduleList[selectedDate.planDay - 1].destinationDtoList.map(
          (destination) => (
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
          )
        )}
      </div>
    </>
  );
};

export default ExistsSchedule;
