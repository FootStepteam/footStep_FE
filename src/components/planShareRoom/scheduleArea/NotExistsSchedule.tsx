import { useRecoilState, useRecoilValue } from "recoil";
import { sideBarState } from "../../../state/sidebarState";
import { disabledState } from "../../../state/componentOpenState";

const NotExistsSchedule = () => {
  const [sideBarOpenState, setSidebarOpenState] = useRecoilState(sideBarState);
  const disabledStatus = useRecoilValue(disabledState);

  const onClickHandler = () => {
    setSidebarOpenState({ ...sideBarOpenState, placeSearch: true });
  };

  return (
    <div
      className={`relative pt-[2rem] h-[32rem] bg-gray-005 ${
        !disabledStatus.placeSection ? "z-[1005]" : "z-[1003]"
      } `}
    >
      <div className="flex flex-col items-center justify-center font-NanumGothic font-bold text-gray-002 text-sm">
        <p className="my-0.5">추가된 장소가 없습니다.</p>
        <p className="my-0.5">방문할 장소를 추가해보세요 !</p>
      </div>
      <button
        type="button"
        className="flex my-8 mx-auto px-20 py-3 rounded-sm bg-sky-001 font-DoHyeon text-xl text-white font-normal"
        onClick={onClickHandler}
      >
        장소추가
      </button>
    </div>
  );
};

export default NotExistsSchedule;
