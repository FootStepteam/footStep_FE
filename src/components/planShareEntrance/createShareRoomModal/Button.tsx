import { useRecoilState, useRecoilValue } from "recoil";
import { createModalOpenState } from "../../../state/createModalOpen";
import { createShareRoomAPI } from "../../../api/shareRoomAPI";
import { createShareRoomFormValue } from "../../../store/createShareRoomFormValue";

const Button = () => {
  const [openCreateModal, setOpenCreateModal] =
    useRecoilState(createModalOpenState);

  const formValue = useRecoilValue(createShareRoomFormValue);

  const validationCheck = () => {
    if (
      formValue.title === "" ||
      formValue.startDate === "" ||
      formValue.endDate === ""
    ) {
      return false;
    }
    return true;
  };

  const onClickCreateHandler = () => {
    if (!validationCheck()) {
      alert("!!");
      return;
    }
    createShareRoomAPI(formValue);
  };

  const clickCancleHandler = () => {
    setOpenCreateModal(!openCreateModal);
  };

  return (
    <div className="mt-12">
      <button
        type="button"
        className="mx-4 px-5 py-3 bg-[#5AD18F] rounded-lg text-white text-lg font-bold"
        onClick={onClickCreateHandler}
      >
        생성
      </button>
      <button
        type="button"
        className="mx-4 px-5 py-3 bg-[#969696] rounded-lg text-white text-lg font-bold"
        onClick={clickCancleHandler}
      >
        취소
      </button>
    </div>
  );
};

export default Button;
