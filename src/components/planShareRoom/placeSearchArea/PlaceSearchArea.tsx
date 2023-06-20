import PlaceSearchAreaHeader from "./PlaceSearchAreaHeader";
import PlaceSearchAreaContent from "./PlaceSearchAreaContent";
import { IPropsPlaceSearch } from "../../../type/shareRoom";
import { sidebarState } from "../../../state/sidebarState";
import { useRecoilState } from "recoil";
import { ReactComponent as LeftArrow } from "../../../assets/leftArrow.svg";

const PlaceSearchArea = ({ placeSearch }: IPropsPlaceSearch) => {
  const [sidebarOpenState, setSidebarOpenState] = useRecoilState(sidebarState);

  const onClickHandler = () => {
    setSidebarOpenState({ ...sidebarOpenState, placeSearch: false });
  };

  return (
    <div className={`relative shadow-lg bg-white z-[1001] ${sidebarOpenState.placeSearch ? "animate-placeSearchAreaShow" : "left-[-25rem] animate-placeSearchAreaClose"}`}>
      <PlaceSearchAreaHeader placeSearch={placeSearch} />
      <PlaceSearchAreaContent />
      <div
        className={`${
          sidebarOpenState.placeSearch ? "block" : "hidden"
        } flex items-center absolute top-[50%] right-[-7%] w-6 h-16 bg-white rounded-r-xl cursor-pointer`}
        onClick={onClickHandler}
      >
        <LeftArrow className={"fill-[#DCDCDC]"} width="20" height="20" />
      </div>
    </div>
  );
};

export default PlaceSearchArea;
