import { ChangeEvent, FormEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";
import { selectedArea } from "../../../state/selectedArea";
import { IPropsPlaceSearch } from "../../../type/shareRoom";

const PlaceSearchBar = ({ placeSearch }: IPropsPlaceSearch) => {
  const [keyword, setKeyword] = useState<string>("");
  const selected = useRecoilValue(selectedArea);
  const MySwal = withReactContent(Swal);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (selected === "noSelected") {
      MySwal.fire({
        icon: "error",
        text: "지역 선택 후 장소 검색을 해주세요",
      });
      return;
    }

    placeSearch(keyword);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-center items-center mt-4 mx-auto w-[20rem] h-[3rem] bg-white rounded-sm shadow-lg"
    >
      <input
        type="text"
        placeholder="장소, 주소 검색"
        className="grow pl-4 py-2 outline-none placeholder:text-sm"
        onChange={onChangeHandler}
      />
      <SearchIcon className="mx-4 w-[18px] h-[18px]" fill="#A5A5A5" />
    </form>
  );
};

export default PlaceSearchBar;
