import { useRecoilState, useRecoilValue } from 'recoil';
import { createModalOpenState } from '../../../state/createModalOpen';
import { createShareRoomAPI } from '../../../api/shareRoomAPI';
import { createShareRoomFormValue, initialValue } from '../../../store/createShareRoomFormValue';
import { jwtAccessTokenState } from '../../../state/loginState';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Button = () => {
  const [openCreateModal, setOpenCreateModal] = 
    useRecoilState(createModalOpenState);

  const [shareRoomForm, setShareRoomForm] = useRecoilState(createShareRoomFormValue);
  const token = useRecoilValue(jwtAccessTokenState);

  const MySwal = withReactContent(Swal);

  const validationCheck = () => {
    let errorMsg = "";

    if(shareRoomForm.title === "") {
      errorMsg = "일정 제목을 입력해주세요.";
    }else if(shareRoomForm.startDate === "" || shareRoomForm.endDate === ""){
      errorMsg = "일자를 선택해주세요.";
    }

    if(errorMsg !== ""){
      MySwal.fire({
        icon: "error",
        text: errorMsg,
      });
      return false;
    }

    return true;
  };

  const onClickCreateHandler = () => {
    if (!validationCheck()) {
      return;
    }
    
    createShareRoomAPI(shareRoomForm, token);
    
    MySwal.fire({
      icon: "success",
      text: "등록이 완료되었습니다.",
    })
    
    setShareRoomForm(initialValue);
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
