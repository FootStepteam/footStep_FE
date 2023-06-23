import { useRecoilState, useRecoilValue } from "recoil";
import { sideBarState } from "../../../state/sidebarState";
import { schedule } from "../../../store/schedule";
import { selectedDay } from "../../../store/selectedDay";

const ExistsSchedule = () => {
  const [scheduleList, setScheduleList] = useRecoilState(schedule);
  const [sideBarOpenState, setSidebarOpenState] = useRecoilState(sideBarState);
  const selectedDate = useRecoilValue(selectedDay);

  const onClickaddPlaceHandler = () => {
    if (!sideBarOpenState.placeSearch) {
      setSidebarOpenState({ ...sideBarOpenState, placeSearch: true });
    }
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
      <div className="flex flex-col items-center">
        {scheduleList[selectedDate.planDay - 1].destinationDtoList.map(
          (item) => (
            <div
              key={item.destinationId}
              className="mt-4 px-3 py-4 w-[17rem] bg-white border border-gray-003 rounded-md shadow-md"
            >
              <p className="text-[1.2rem] font-[500]">{item.destinationName}</p>
              <p className="mt-1 text-[0.8rem] font-light">
                {item.destinationAddress}
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ExistsSchedule;
