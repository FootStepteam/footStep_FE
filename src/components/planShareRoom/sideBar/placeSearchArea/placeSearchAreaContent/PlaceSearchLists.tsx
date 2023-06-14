import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import usePlaceSeacrh from "../../../../../hooks/usePlaceSearch";
import { IKakaoPlaceSearchResult } from "../../../../../type/kakaoPlaceSearchResult";
import { placeSearchResult } from "../../../../../store/placeSearchResult";

const PlaceSearchLists = () => {
  // const [result] = usePlaceSeacrh();
  const placeLists = useRecoilValue(placeSearchResult);

  useEffect(() => {
    console.log(placeLists);
  }, [placeLists]);

  return (
    <div className="grow bg-white">
      <button type="button" className="justify-end">
        장소 추천
      </button>
      <h3>검색결과</h3>
      <div>
        {placeLists.map((place: IKakaoPlaceSearchResult) => (
          <p>{place.address_name}</p>
        ))}
      </div>
    </div>
  );
};

export default PlaceSearchLists;
