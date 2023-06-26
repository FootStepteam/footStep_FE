import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookie";
import { refreshTokenAPI } from "./shareRoomAPI";

export const getScheduleAPI = async (
  shareRoomID: number,
  startDate: string,
  endDate: string
) => {
  const id = Number(shareRoomID);

  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.get(
      `/api/api/share-room/${id}/schedule?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        getScheduleAPI(shareRoomID, startDate, endDate);
      }
    }
  }
};

export const getScheduleByDateAPI = async (
  shareRoomID: number,
  planDate: string
) => {
  try {
    const response = await axios.get(
      `/api/api/share-room/${shareRoomID}/schedule/plan?date=${planDate}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.ErrorCode;
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
      const errorCode = error.response?.data.code;
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        addSchedultMemoAPI(shareRoomID);
      }
    }
  }
};
