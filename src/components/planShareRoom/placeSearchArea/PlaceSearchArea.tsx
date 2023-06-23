import { useRecoilState } from "recoil";
import { ReactComponent as LeftArrow } from "../../../assets/leftArrow.svg";
import { sideBarState } from "../../../state/sidebarState";
import { IPropsSideBar } from "../../../type/shareRoom";
import PlaceSearchAreaContent from "./PlaceSearchAreaContent";
import PlaceSearchAreaHeader from "./PlaceSearchAreaHeader";
import useManageSchedule from "../../../hooks/useManageSchdule";

const PlaceSearchArea = ({ placeSearch, panTo }: IPropsSideBar) => {
  const [sideBarOpenState, setSideBarOpenState] = useRecoilState(sideBarState);
  const { addDestination } = useManageSchedule();

  const onClickHandler = () => {
    setSideBarOpenState({ ...sideBarOpenState, placeSearch: false });
  };

  return (
    <div
      className={`relative w-[23rem] max-h-100vh shadow-lg bg-gray-007 z-[1001] transition-[left] duration-300 ease-in-out ${
        sideBarOpenState.placeSearch ? "left-0" : "left-[-50rem]"
      }`}
    >
      <PlaceSearchAreaHeader placeSearch={placeSearch} />
      <PlaceSearchAreaContent
        panTo={panTo}
        addDestination={addDestination}
      />
      <div
        className={`${
          sideBarOpenState.placeSearch ? "block" : "hidden"
        } flex items-center absolute top-[50%] right-[-6%] w-6 h-16 bg-white rounded-r-xl cursor-pointer`}
        onClick={onClickHandler}
      >
        <LeftArrow
          className={"fill-[#DCDCDC]"}
          width="20"
          height="20"
        />
      </div>
    </div>
  );
};

export default PlaceSearchArea;
