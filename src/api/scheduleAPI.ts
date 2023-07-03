import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

export const getScheduleAPI = async (shareRoomID: number) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get(
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
    }
  }
};

export const getScheduleByDateAPI = async (
  shareRoomID: number,
  planDate: string
) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get(
      `/api/api/share-room/${shareRoomID}/schedule/plan?date=${planDate}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
      console.log(errorCode);
    }
  }
};

export const completeScheduleAPI = async (shareRoomID: number) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

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
      if (errorCode === "NOT_MATCH_CREATE_MEMBER") {
        Swal.fire({
          icon: "error",
          text: "공유방 생성자가 아닙니다.",
        });
      }
    }
  }
};

interface IForm {
  content: string;
  planDate: string;
}

export const addSchedultMemoAPI = async (
  shareRoomID: number,
  memberID: number,
  form: IForm
) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.post(
      `/api/api/share-room/${shareRoomID}/schedule?memberId=${memberID}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        text: "일정 메모 저장이 완료되었습니다.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
