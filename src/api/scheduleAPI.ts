import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookie";
import { refreshTokenAPI } from "./shareRoomAPI";
import Swal from "sweetalert2";

export const getScheduleAPI = async (shareRoomID: number) => {
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
      const errorCode = error.response?.data.errorCode;
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        getScheduleAPI(shareRoomID);
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
      const errorCode = error.response?.data.errorCode;
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
      const errorCode = error.response?.data.errorCode;
      if (errorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        addSchedultMemoAPI(shareRoomID);
      }
    }
  }
};

export const completeScheduleAPI = async (shareRoomID: number) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.delete(
      `/api/api/share-room/${shareRoomID}/schedule`,
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
        completeScheduleAPI(shareRoomID);
      } else if (errorCode === "NOT_MATCH_CREATE_MEMBER") {
        Swal.fire({
          icon: "error",
          text: "공유방 생성자가 아닙니다.",
        });
      }
    }
  }
};
