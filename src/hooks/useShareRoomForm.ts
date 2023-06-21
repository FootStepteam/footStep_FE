import { ChangeEvent, useEffect, useState } from "react";
import { getShareRoomInfoAPI } from "../api/shareRoomAPI";
import { ISelectedDate } from "../type/shareRoomForm";
import { IShareRoom } from "../type/shareRoom";

interface IForm {
  title: string;
  startDate: string;
  endDate: string;
}

const initialForm = {
  title: "",
  startDate: "",
  endDate: "",
};

const initialShareRoomInfo = {
  endPoint: "",
  imageUrl: "",
  shareCode: "",
  shareId: 1,
  shareName: "",
  startPoint: "",
  travelEndDate: "",
  travelStartDate: "",
};

const useShareRoomForm = () => {
  const [form, setForm] = useState<IForm>(initialForm);
  const [shareRoomInfo, setShareRoomInfo] =
    useState<IShareRoom>(initialShareRoomInfo);

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
