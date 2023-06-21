import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { editShareRoomInfoAPI } from "../../../api/shareRoomAPI";
import { ReactComponent as Exit } from "../../../assets/exit.svg";
import useShareRoomForm from "../../../hooks/useShareRoomForm";
import { jwtAccessTokenState } from "../../../state/loginState";
import { formValidationCheck } from "../../../utils/formValidationCheck";
import Calendar from "../../common/calendar/Calendar";

const ScheduleAreaHeader = () => {
  const token = useRecoilValue(jwtAccessTokenState);
  const { shareRoomID } = useParams<string>();
  const {
    form,
    getData,
    onChangeTitleHandler,
    onChangeDateHandler,
    shareRoomInfo,
  } = useShareRoomForm();
  const [editStatus, setEditStatus] = useState<boolean>(false);

  const MySwal = withReactContent(Swal);

  const type = "get";

  const onClickHandler = async (type: string) => {
    switch (type) {
      case "cancel":
        setEditStatus(false);
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

  useEffect(() => {
    if (shareRoomID) {
      getData(shareRoomID);
    }
  }, []);

  return (
    <div className="w-planShareRoomSideBar h-planShareRoomHeader bg-gray-007">
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="mt-4 mb-6 ml-2  "
        >
          <Exit
            fill="#A5A5A5"
            width={25}
            height={25}
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
            defaultValue={form.title}
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
          shareRoomInfo={shareRoomInfo}
        />
      </div>
    </div>
  );
};

export default ScheduleAreaHeader;
