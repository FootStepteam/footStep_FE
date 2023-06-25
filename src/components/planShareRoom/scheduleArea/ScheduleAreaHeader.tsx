import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { editShareRoomInfoAPI } from "../../../api/shareRoomAPI";
import { ReactComponent as Exit } from "../../../assets/exit.svg";
import useShareRoomForm from "../../../hooks/useShareRoomForm";
import { getCookie } from "../../../utils/cookie";
import { formValidationCheck } from "../../../utils/formValidationCheck";
import Calendar from "../../common/calendar/Calendar";

const ScheduleAreaHeader = () => {
  const token = getCookie("accessToken");
  const { shareRoomID } = useParams<string>();
  const {
    form,
    backUpForm,
    setForm,
    getData,
    onChangeTitleHandler,
    onChangeDateHandler,
    scheduleShareRoomInfo,
  } = useShareRoomForm();
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const type = "inShareRoom";

  const onClickHandler = async (type: string) => {
    switch (type) {
      case "cancel":
        setEditStatus(false);
        setForm({ ...backUpForm });
        break;
      case "edit":
        setEditStatus(true);
        break;
      case "complete":
        if (!formValidationCheck(form)) return;

        if (shareRoomID) {
          const result = await editShareRoomInfoAPI(shareRoomID, token, form);

          if (result === 200) {
            MySwal.fire({
              icon: "success",
              text: "수정이 성공적으로 되었습니다",
            });
            getData(shareRoomID);
            setEditStatus(false);
          } else {
            MySwal.fire({
              icon: "success",
              text: "처리 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
            });
          }
        }
    }
  };

  const onClickExitHanlder = () => {
    MySwal.fire({
      title: "정말로 나가시겠습니까?",
      text: "저장하지 않았을 경우 다시 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "나가기",
      cancelButtonText: "취소",
    }).then((result) => {
      result.isConfirmed && navigate("/planShareEntrance");
    });
  };

  useEffect(() => {
    if (shareRoomID) {
      getData(shareRoomID);
    }
  }, []);

  return (
    <div className="w-planShareRoomSideBar h-[13.5rem] bg-gray-007">
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="mt-4 mb-6 ml-2  "
        >
          <Exit
            className="w-[25px] h-[25px] fill-black-003 hover:fill-red-001"
            onClick={onClickExitHanlder}
          />
        </button>
        {editStatus ? (
          <div className="flex mr-4 text-sm">
            <p
              className="mx-1 text-green-001 cursor-pointer"
              onClick={() => onClickHandler("complete")}
            >
              수정
            </p>
            <p
              className="mx-1 text-red-001 cursor-pointer"
              onClick={() => onClickHandler("cancel")}
            >
              취소
            </p>
          </div>
        ) : (
          <p
            className="mr-4 text-blue-001 text-sm cursor-pointer"
            onClick={() => onClickHandler("edit")}
          >
            편집
          </p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center w-[17rem]">
          <input
            type="text"
            value={editStatus ? form.title : backUpForm.title}
            className="w-[12rem] bg-gray-007 outline-none text-black font-NanumGothic text-2xl font-[800]"
            onChange={onChangeTitleHandler}
            disabled={editStatus ? false : true}
          />
          {editStatus && (
            <p className="grow ml-4 text-xl text-gray-002">
              {form.title.length} / 20
            </p>
          )}
        </div>
        <Calendar
          type={type}
          editStatus={editStatus}
          onChangeDateHandler={onChangeDateHandler}
          shareRoomInfo={scheduleShareRoomInfo}
        />
      </div>
    </div>
  );
};

export default ScheduleAreaHeader;
