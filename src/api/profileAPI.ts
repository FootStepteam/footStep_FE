import axios from "axios";
import { getCookie } from "../utils/cookie";

export const getUserInfo = async (accessToken: string): Promise<IMember> => {
  const response = await axios.get<IMember>(`/api/api/members/${accessToken}`);
  return response.data;
};

export const updateMemberProfile = async (formData: any) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);
  const response = await axios.put(`/api/api/members/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
