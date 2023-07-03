import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

interface IBodyDate {
  planDate: string;
  destinationCategoryCode: string;
  destinationName: string;
  destinationAddress: string;
  lng: number;
  lat: number;
  seq: number;
}

export const addDestinationAPI = async (
  shareRoomID: number,
  bodyData: IBodyDate
) => {
  const id = Number(shareRoomID);

  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.post(
      `/api/api/share-room/${id}/destination`,
      bodyData,
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
      if (errorCode === "ALREADY_DESTINATION") {
        Swal.fire({
          icon: "error",
          text: "이미 등록된 목적지 입니다.",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "처리 중 오류가 발생하였습니다.",
        });
      }
    }
  }
};

export const deleteDestinationAPI = async (
  shareRoomID: number,
  destinationId: number
) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.delete(
      `/api/api/share-room/${shareRoomID}/destination/${destinationId}`,
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
      if (errorCode === "NOT_FIND_DESTINATION_ID") {
        Swal.fire({
          icon: "error",
          text: "이미 삭제된 목적지 입니다.",
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
