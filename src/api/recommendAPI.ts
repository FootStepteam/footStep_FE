import axios from "axios";
import Swal from "sweetalert2";
import { IStartPoint } from "../type/startPoint";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

export const recommendScheduleAPI = async (
  startPoint: IStartPoint,
  shareRoomID: number
) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.put(
      `/api/api/share-room/${shareRoomID}/schedule/recommend`,
      startPoint,
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
      if (errorCode === "NOT_FIND_SHARE_ID") {
        Swal.fire({
          icon: "error",
          text: "존재하지 않는 공유방 입니다.",
        });
      } else if (errorCode === "NOT_FIND_DESTINATION_ID") {
        Swal.fire({
          icon: "error",
          text: "존재하지 않는 목적지 입니다.",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "처리 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
        });
      }
    }
  }
};

export const getRecommendPlacesAPI = async (keyword: string) => {
  try {
    const response = await axios.get(
      `/api/api/share-room/recommend?keyword=${keyword}`
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "처리 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
    });
  }
};
