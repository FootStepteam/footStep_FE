import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookie";
import { refreshTokenAPI } from "./shareRoomAPI";

export const getScheduleAPI = async (shareRoomID: string) => {
  const id = Number(shareRoomID);

  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.get(`/api/api/share-room/${id}/schedule`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        getScheduleAPI(shareRoomID);
      }
    }
  }
};

export const addSchedultMemoAPI = async (shareRoomID: string) => {
  const id = Number(shareRoomID);

  const KEY = "accessToken";
  const token = getCookie(KEY);

  const data = {
    planDate: "",
    content: "",
  };
  try {
    const response = await axios.post(
      `/api/api/share-room/${id}/schedule`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        addSchedultMemoAPI(shareRoomID);
      }
    }
  }
};
