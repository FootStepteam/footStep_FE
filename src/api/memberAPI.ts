import axios from "axios";
import { getCookie } from "../utils/cookie";
import { refreshTokenAPI } from "./shareRoomAPI";

export const getMemberByAccessToken = async (): Promise<any> => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  if (!token) {
    return null;
  }

  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;

  try {
    const response = await axios.get(`/api/api/members/${token}`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        await refreshTokenAPI();
        return getMemberByAccessToken();
      }
    }
    throw error;
  }
};

export const getCurrentUserNickname = async (): Promise<string | null> => {
  const memberData = await getMemberByAccessToken();

  if (!memberData) {
    return null;
  }

  return memberData.nickname;
};
