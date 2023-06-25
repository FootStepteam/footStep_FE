import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookie";
import { IStartPoint } from "../type/startPoint";
import { refreshTokenAPI } from "./shareRoomAPI";
import Swal from "sweetalert2";

export const recommendScheduleAPI = async (
  startPoint: IStartPoint,
  shareRoomID: number
) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.put(
      `/api/api/share-room/${shareRoomID}/schedule/recommend`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: startPoint,
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      const errorCode = error.response?.data.errorCode;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        removeCookie("accessToken");
        refreshTokenAPI();
        recommendScheduleAPI(startPoint, shareRoomID);
      } else if (errorCode === "NOT_FIND_SHARE_ID") {
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
