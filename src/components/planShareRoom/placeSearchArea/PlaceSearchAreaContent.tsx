import { useRecoilState } from "recoil";
import { recommendState } from "../../../state/recommendState";
import { IPlaceContentDown } from "../../../type/shareRoom";
import PlaceRecommendList from "./PlaceRecommendList";
import PlaceSearchLists from "./PlaceSearchLists";
import { useEffect } from "react";

const PlaceSearchAreaContent = ({
  panTo,
  addDestination,
  placePagination,
}: IPlaceContentDown) => {
  const [recommendStatus, setRecommendStats] = useRecoilState(recommendState);

  const onClickSetRecommendStatus = () => {
    setRecommendStats(!recommendStatus);
  };

  useEffect(() => {
    setRecommendStats(false);
  }, []);

  return (
    <div className="flex flex-col w-[23rem] h-[calc(100vh-15rem)]">
      <div className="flex justify-end items-center mt-6 mr-4">
        <input
          type="checkbox"
          id="recommend"
          className="mr-2 w-4 h-4 checked:bg-orange-001"
          onClick={onClickSetRecommendStatus}
        />
        <label
          htmlFor="recommend"
          className="text-[0.8rem]"
        >
          장소추천받기
        </label>
      </div>
      {recommendStatus && (
        <PlaceRecommendList
          addDestination={addDestination}
          panTo={panTo}
        />
      )}
      <PlaceSearchLists
        panTo={panTo}
        addDestination={addDestination}
        placePagination={placePagination}
        recommendStatus={recommendStatus}
      />
    </div>
  );
};

export default PlaceSearchAreaContent;
