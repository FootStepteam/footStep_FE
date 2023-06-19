import { useRecoilValue } from "recoil";
import { ReactComponent as Exit } from "../../../assets/exit.svg";
import { shareRoomInfo } from "../../../store/shareRoomInfo";
import Calendar from "../../common/calendar/Calendar";
import { useState } from "react";

const ScheduleAreaHeader = () => {
  const getShareRoomInfo = useRecoilValue(shareRoomInfo);
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const type = "get";

  const onClickHandler = (type: string) => {
    switch(type) {
      case "cancel":
        setEditStatus(false);
        break;
      case "edit" :
        setEditStatus(true);
        break;
    }
  }

  return (
    <div className="w-planShareRoomSideBar h-planShareRoomHeader bg-blue-003">
      <div className="flex justify-between items-center">
        <button type="button" className="mt-4 mb-6 ml-2  ">
          <Exit fill="#A5A5A5" width={25} height={25} />
        </button>
        {editStatus ? (
          <div className="flex mr-4 text-white text-sm">
            <p className="mx-1 cursor-pointer">
              수정
            </p>
            <p className="mx-1 cursor-pointer" onClick={() => onClickHandler("cancel")}>취소</p>
          </div>
           ): (
          <p className="mr-4 text-white text-sm cursor-pointer" onClick={() => onClickHandler("edit")}>
            편집
          </p>
          )
        }
      </div>
      <div className="ml-12">
        <input 
          type="text"
          defaultValue={getShareRoomInfo.shareName}
          className="w-[16rem] bg-blue-003 text-white text-2xl font-bold"
          disabled={editStatus ? false : true} 
          />
        <Calendar type={type} editStatus={editStatus}/>
      </div>
    </div>
  );
};

export default ScheduleAreaHeader;
