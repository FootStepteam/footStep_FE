import { useRecoilState } from 'recoil';
import { ReactComponent as LeftArrow } from '../../../../assets/leftArrow.svg';
import DaySelect from './DaySelect';
import PlaceLists from './PlaceLists';
import SideBarHeader from './SideBarHeader';
import { sidebarState } from '../../../../state/sidebarState';

const ScheduleArea = () => {
  const [sidebarOpenState, setSidebarOpenState] = useRecoilState(sidebarState);

  const onClickHandler = () => {
    setSidebarOpenState({ ...sidebarOpenState, schedule: !sidebarOpenState.schedule });
  };

  return (
    <div className="relative w-[25rem] shadow-xl">
      <SideBarHeader />
      <DaySelect />
      <PlaceLists />
      <div
        className={`${sidebarOpenState.placeSearch && 'hidden'} flex justify-center items-center absolute top-[50%] right-[-6%] w-6 h-16 bg-white rounded-r-xl cursor-pointer`}
        onClick={onClickHandler}
      >
        <LeftArrow
          width="20"
          height="20"
          fill="black"
        />
      </div>
    </div>
  );
};

export default ScheduleArea;
