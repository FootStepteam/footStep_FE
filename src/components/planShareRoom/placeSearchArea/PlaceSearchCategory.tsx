import { IPropsPlaceSearch } from "../../../type/shareRoom";
import { useRecoilState } from "recoil";
import { selectedArea } from "../../../state/selectedArea";
import { ADMINISTRATIVE_DISTRICT } from "../../../data/area";

const PlaceSearchCategory = ({ placeSearch }: IPropsPlaceSearch) => {
  const [selected, setSelected] = useRecoilState(selectedArea);

  const onClickHandler = (category: string) => {
    setSelected(category);
    placeSearch(category);
  };

  return (
    <div className="grid grid-cols-8 mt-6">
      {ADMINISTRATIVE_DISTRICT.map((district) => (
        <p
          key={district}
          className={`flex justify-center items-center py-2 cursor-pointer ${
            selected === district
              ? "text-white bg-platinum-001"
              : "bg-white text-black border border-gray-003"
          }`}
          onClick={() => onClickHandler(district)}
          role="presentation"
        >
          {district}
        </p>
      ))}
    </div>
  );
};

export default PlaceSearchCategory;
