import { useRecoilValue } from 'recoil';
import { sidebarState } from '../../../state/sidebarState';
import { IPropsPlaceSearch } from '../../../type/shareRoom';
import PlaceSearchArea from './placeSearchArea/PlaceSearchArea';
import ScheduleArea from './scheduleArea/ScheduleArea';

const SideBar = ({ placeSearch }: IPropsPlaceSearch) => {
  const sidebarOpenState = useRecoilValue(sidebarState);

  return (
    <div className="flex absolute min-h-screen bg-white z-[1001]">
      {sidebarOpenState.schedule && <ScheduleArea />}
      {sidebarOpenState.placeSearch && <PlaceSearchArea placeSearch={placeSearch} />}
    </div>
  );
};

export default SideBar;
