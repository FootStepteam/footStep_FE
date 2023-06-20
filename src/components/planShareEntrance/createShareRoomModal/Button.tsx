import { useRecoilState, useRecoilValue } from 'recoil';
import { createModalOpenState } from '../../../state/createModalOpen';
import { createShareRoomAPI } from '../../../api/shareRoomAPI';
import { scheduleShareRoomForm, initialValue } from '../../../store/shareRoomForm';
import { jwtAccessTokenState } from '../../../state/loginState';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { formValidationCheck } from '../../../utils/formValidationCheck';

const Button = () => {
  const [openCreateModal, setOpenCreateModal] = 
    useRecoilState(createModalOpenState);

  const [shareRoomForm, setShareRoomForm] = useRecoilState(scheduleShareRoomForm);
  const token = useRecoilValue(jwtAccessTokenState);

  const MySwal = withReactContent(Swal);

  const onClickCreateHandler = async () => {
    if(!formValidationCheck(shareRoomForm)) return;
    
    const result = await createShareRoomAPI(shareRoomForm, token);

    if(result.status === 200){
      MySwal.fire({
        icon: "success",
        text: "등록이 완료되었습니다.",
      })
    }else{
      MySwal.fire({
        icon: "error",
        text: "처리 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요",
      });
    }
    
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
