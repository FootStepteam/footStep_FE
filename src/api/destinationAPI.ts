import axios from "axios";
import { getCookie } from "../utils/cookie";
import { refreshTokenAPI } from "./shareRoomAPI";

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
  shareRoomID: string,
  bodyData: IBodyDate
) => {
  const id = Number(shareRoomID);
  console.log(bodyData);
  const KEY = "accessToken";
  const token = getCookie(KEY);

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
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        refreshTokenAPI();
        addDestinationAPI(shareRoomID, bodyData);
      }
    }
  }
};
