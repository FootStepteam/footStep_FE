import { useRecoilState } from 'recoil';
import { sidebarState } from '../../../../state/sidebarState';

const PlaceLists = () => {
  const [sidebarOpenState, setSidebarOpenState] = useRecoilState(sidebarState);

  const onClickHandler = () => {
    setSidebarOpenState({ ...sidebarOpenState, placeSearch: true });
  };

  return (
    <div className="mt-[80px]">
      <div className="flex flex-col items-center justify-center text-gray-002 text-xl font-[500]">
        <p className="my-1">추가된 장소가 없습니다.</p>
        <p className="my-1">방문할 장소를 추가해보세요 !</p>
      </div>
      <button
        type="button"
        className="flex my-8 mx-auto px-8 py-6 rounded-3xl bg-gray-003 text-2xl text-white font-bold"
        onClick={onClickHandler}
      >
        + 장소추가
      </button>
    </div>
  );
};

export default PlaceLists;
