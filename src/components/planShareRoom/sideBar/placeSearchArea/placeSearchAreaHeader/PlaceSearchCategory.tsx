import { useState } from "react";
import { IPropsPlaceSearch } from "../../../../../type/shareRoom";
import { useRecoilState } from "recoil";
import { selectedArea } from "../../../../../state/selectedArea";

const categoriesFirstRow: string[] = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "울산",
  "대전",
  "강원",
  "충남",
  "충북",
  "전남",
  "전북",
  "광주",
  "경남",
  "경북",
  "제주",
];
const PlaceSearchCategory = ({ placeSearch }: IPropsPlaceSearch) => {
  const [selected, setSelected] = useRecoilState(selectedArea);

  const onClickHandler = (category: string) => {
    setSelected(category);
    placeSearch(category)
  }

  return (
    <div className="grid grid-cols-8 mt-6">
      {categoriesFirstRow.map((category) => (
        <p
          key={category}
          className={`flex justify-center items-center py-2 cursor-pointer ${selected === category ? "text-white bg-platinum-001" : "bg-white text-black border border-gray-003"}`}
          onClick={() => onClickHandler(category)}
          role="presentation"
        >
          {category}
        </p>
      ))}
    </div>
  );
};

export default PlaceSearchCategory;
