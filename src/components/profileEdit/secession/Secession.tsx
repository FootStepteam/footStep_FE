import { useState } from "react";

const Secession = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const onClickCheckedHandler = () => {
    setChecked(!checked);
  };

  const onClickSecessionHandler = () => {
    if (!checked) {
      alert("회원탈퇴 동의를 체크하셔야 탈퇴가 가능합니다.");
    }
  };

  return (
    <div className="h-section">
      <div className="flex flex-col">
        <div className="flex flex-col items-center m-center pt-32 w-[30rem] text-xl">
          <p>탈퇴 시 이용중인 서비스 사용이 불가능하며,</p>
          <p>등록된 데이터는 모두 삭제가 되며 복구가 불가능합니다.</p>
          <p className="mt-8 text-2xl font-bold">그래도 탈퇴하시겠습니까?</p>
        </div>
        <div className="flex items-center m-center mt-6">
          <input
            id="check"
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            onClick={onClickCheckedHandler}
          />
          <label htmlFor="check" className="ml-2 text-sm cursor-pointer">
            회훤탈퇴에 동의합니다.
          </label>
        </div>
        <div className="m-center">
          <button
            onClick={onClickSecessionHandler}
            type="button"
            className="mt-8 px-4 py-3 border-2 border-[#FF3232] rounded-md text-[#FF3232] text-2xl font-bold hover:bg-[#FF3232] hover:text-white"
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Secession;
