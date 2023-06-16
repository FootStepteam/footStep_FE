import axios from "axios";
import {
  ICreateShareRoomFormValue,
  ISubmitShareRoomData,
} from "../type/shareRoom";

export const getShareRoomAPI = async (shareCode: string) => {
  const response = await axios.get(`/api/api/share-room/find?q=${shareCode}`);

  return response;
};

export const createShareRoomAPI = async (
  formValue: ICreateShareRoomFormValue
) => {
  const data: ISubmitShareRoomData = {
    shareName: formValue.title,
    travelStartDate: formValue.startDate,
    travelEndDate: formValue.endDate,
    imageUrl: "",
  };
  console.log(data);
  const response = await axios.post("/api/api/share-room", data);
  console.log(response);

  return response;
};

export const getIncludeShareRoomAPI = async () => {
  const body = {
    page: 0,
    size: 10
  }

  const response = await axios.get("/api/api/share-room", body);

  return response.data;
}

export const getShareRoomInfoAPI = async (shareRoomID: string) => {
  const id = Number(shareRoomID);
  const response = await axios.get(`/api/api/share-room/${id}`)

  return response.data;
}