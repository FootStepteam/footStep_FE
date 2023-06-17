import { useRecoilState, useRecoilValue } from 'recoil';
import { createModalOpenState } from '../../../state/createModalOpen';
import { createShareRoomAPI } from '../../../api/shareRoomAPI';
import { createShareRoomFormValue } from '../../../store/createShareRoomFormValue';
import { jwtAccessTokenState } from '../../../state/loginState';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Button = () => {
  const [openCreateModal, setOpenCreateModal] = 
    useRecoilState(createModalOpenState);

  const formValue = useRecoilValue(createShareRoomFormValue);
  const token = useRecoilValue(jwtAccessTokenState);

  const MySwal = withReactContent(Swal);

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
      return;
    }
    
    createShareRoomAPI(formValue, token);
    
    MySwal.fire({
      icon: "success",
      text: "등록이 완료되었습니다.",
    })
    
    setOpenCreateModal(false);
    
  };

  const clickCancleHandler = () => {
    setOpenCreateModal(!openCreateModal);
  };

  return (
    <div className="mt-12">
      <button
        type="button"
        className="mx-4 px-5 py-3 bg-platinum-001 rounded-lg text-white text-lg font-bold"
        onClick={onClickCreateHandler}
      >
        생성
      </button>
      <button
        type="button"
        className="mx-4 px-5 py-3 bg-gray-001 rounded-lg text-white text-lg font-bold"
        onClick={clickCancleHandler}
      >
        취소
      </button>
    </div>
  );
};

export default Button;
