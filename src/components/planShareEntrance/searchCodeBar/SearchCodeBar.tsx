import { ChangeEvent, FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { getShareRoomAPI } from "../../../api/shareRoomAPI";
import { searchShareRoomData } from "../../../store/searchShareRoom";

const SearchCodeBar = () => {
  const [shareCode, setShareCode] = useState<string>("");
  const setSearchShareRoomData = useSetRecoilState(searchShareRoomData);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setShareCode(e.target.value);
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = await getShareRoomAPI(shareCode);

    if (result) {
      setSearchShareRoomData(result?.data);
    }
  };

  return (
    <div className="w-full h-64 bg-sky-005">
      <div className="mx-auto pt-14 w-[55rem]">
        <p className="m-center w-[34rem] text-white text-xl font-bold">
          친구들과 자유롭게 계획하는 실시간 여행 일정 계획 플랫폼, 발자국
        </p>
        <form
          method="GET"
          onSubmit={onSubmitHandler}
        >
          <input
            type="text"
            placeholder="초대코드를 8자리를 입력하고 enter키를 눌러주세요! ex) 000000"
            maxLength={8}
            className="block m-center px-8 mt-6 w-[45rem] h-[6rem] bg-white rounded-3xl outline-none"
            onChange={onChangeHandler}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchCodeBar;
