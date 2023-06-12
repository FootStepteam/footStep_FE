import { useRecoilState } from "recoil";
import { createModalOpenState } from "../../../state/createModalOpen";

const Button = () => {
  const [openCreateModal, setOpenCreateModal] =
    useRecoilState(createModalOpenState);

  const clickCancleHandler = () => {
    setOpenCreateModal(!openCreateModal);
  };

  return (
    <div className="mt-12">
      <button
        type="button"
        className="mx-4 px-5 py-3 bg-[#5AD18F] rounded-lg text-white text-lg font-bold"
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
