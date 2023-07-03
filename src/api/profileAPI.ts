import axios from "axios";
import { getCookie } from "../utils/cookie";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

export const getUserInfo = async (accessToken: string): Promise<IMember> => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const response = await axios.get<IMember>(`/api/api/members/${accessToken}`);
  return response.data;
};

export const updateMemberProfile = async (formData: any) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken.isValid) {
    token = await refreshTokenAPI();
  }

  const response = await axios.put(`/api/api/members/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
