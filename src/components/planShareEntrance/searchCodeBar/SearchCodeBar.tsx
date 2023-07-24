import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { getShareRoomAPI } from "../../../api/shareRoomAPI";
import { searchShareRoomData } from "../../../store/searchShareRoom";

const SearchCodeBar = () => {
  const [shareCode, setShareCode] = useState<string>("");
  const setSearchShareRoomData = useSetRecoilState(searchShareRoomData);
  const [placeholder, setPlaceholder] = useState(
    "초대코드를 8자리를 입력하고 enter키를 눌러주세요! ex) 00000000"
  );

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 768) {
        setPlaceholder("초대 코드를 입력하고 enter키를 눌러주세요!");
      } else {
        setPlaceholder(
          "초대코드 8자리를 입력하고 enter키를 눌러주세요! ex) 00000000"
        );
      }
    };

    window.addEventListener("resize", updatePlaceholder);
    updatePlaceholder();

    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

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
    <div className="w-full h-64 px-2 md:px-0 bg-sky-005">
      <div className="mx-auto pt-14 w-full md:w-[55rem]">
        <p className="m-center w-full md:w-[34rem] text-white text-center text-xl break-keep font-bold">
          친구들과 자유롭게 계획하는 실시간 여행 일정 계획 플랫폼, 발자국
        </p>
        <form method="GET" onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder={placeholder}
            maxLength={8}
            className="block m-center px-8 mt-6 w-full md:w-[45rem] h-[6rem] bg-white rounded-3xl outline-none"
            onChange={onChangeHandler}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchCodeBar;
