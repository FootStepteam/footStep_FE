import { useRecoilState } from "recoil";
import { sideBarState } from "../../../state/sidebarState";

const NotExistsSchedule = () => {
  const [sideBarOpenState, setSidebarOpenState] = useRecoilState(sideBarState);

  const onClickHandler = () => {
    setSidebarOpenState({ ...sideBarOpenState, placeSearch: true });
  };

  return (
    <div className="mt-[2rem]">
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
