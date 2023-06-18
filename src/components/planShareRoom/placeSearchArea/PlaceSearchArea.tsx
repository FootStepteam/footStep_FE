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
    <div className="relative shadow-lg">
      <PlaceSearchAreaHeader placeSearch={placeSearch} />
      <PlaceSearchAreaContent />
      <div
        className={`${
          sidebarOpenState.placeSearch ? "block" : "hidden"
        } flex justify-center items-center absolute top-[50%] right-[-6%] w-6 h-16 bg-white rounded-r-xl cursor-pointer`}
        onClick={onClickHandler}
      >
        <LeftArrow width="20" height="20" fill="black" />
      </div>
    </div>
  );
};

export default PlaceSearchArea;
