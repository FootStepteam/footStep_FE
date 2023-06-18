import { useRecoilValue } from "recoil";
import { IKakaoPlaceSearchResult } from "../../../type/kakaoPlaceSearchResult";
import { placeSearchResult } from "../../../store/placeSearchResult";

const PlaceSearchLists = () => {
  const placeLists = useRecoilValue(placeSearchResult);
  const isExist = placeLists.length !== 0;

  const onClickAddPlaceHandler = (place: IKakaoPlaceSearchResult) => {
    // setPlanPlaces({...planPlaces, place});
  };

  return (
    <div id="menu_wrap" className="grow bg-white">
      <h3 className="mt-4 mb-6 ml-4 text-xl font-bold">검색결과</h3>
      <div className="h-[40rem] overflow-y-auto">
        {isExist ? (
          <ul id="placesList">
            {placeLists.map((place: IKakaoPlaceSearchResult, index) => (
              <li
                key={place.id}
                className={`flex py-4 hover:bg-gray-005 border-b border-b-gray-003 cursor-pointer ${
                  index === 0 && "border-t border-t-gray-003"
                }`}
              >
                <div className="ml-4 w-[19em]">
                  <div className="mb-1 flex items-center">
                    <p className="font-medium text-xl">{place.place_name}</p>
                    <p className="text-gray-002 text-sm ml-2">
                      {place.category_group_name}
                    </p>
                  </div>
                  <p className="font-normal text-sm">{place.address_name}</p>
                  <p className="font-normal text-sm">{place.phone}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-8 h-8 border border-gray-003 rounded shadow"
                    onClick={() => onClickAddPlaceHandler(place)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center mt-8 text-gray-002 text-sm">
            <p>검색결과가 존재하지 않습니다.</p>
          </div>
        )}
        <div id="pagination" className="flex justify-center items-center" />
      </div>
    </div>
  );
};

export default PlaceSearchLists;
