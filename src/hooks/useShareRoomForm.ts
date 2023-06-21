import { ChangeEvent, useEffect, useState } from "react";
import { getShareRoomInfoAPI } from "../api/shareRoomAPI";
import { INITIAL_FORM, INITIAL_SHARE_ROOM_INFO } from "../constants/initial";
import { IShareRoom } from "../type/shareRoom";
import { IForm, ISelectedDate } from "../type/shareRoomForm";

const useShareRoomForm = () => {
  const [form, setForm] = useState<IForm>(INITIAL_FORM);
  const [shareRoomInfo, setShareRoomInfo] = useState<IShareRoom>(
    INITIAL_SHARE_ROOM_INFO
  );

  const getData = async (shareRoomID: string) => {
    const response = await getShareRoomInfoAPI(shareRoomID);

    setForm({
      title: response.shareName,
      startDate: response.travelStartDate,
      endDate: response.travelEndDate,
    });
    setShareRoomInfo(response);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      title: e.target.value,
    });
  };

  const onChangeDateHandler = (selectedDate: ISelectedDate) => {
    setForm({
      ...form,
      startDate: selectedDate.submitStartDate,
      endDate: selectedDate.submitEndDate,
    });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return {
    form,
    getData,
    onChangeTitleHandler,
    onChangeDateHandler,
    shareRoomInfo,
  } as const;
};

export default useShareRoomForm;
