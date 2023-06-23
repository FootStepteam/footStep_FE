import axios from "axios";
import { ICommunityPost } from "../type/communityPage";
import { getCookie } from "../utils/cookie";
import { refreshTokenAPI } from "./shareRoomAPI";

export const getPostAPI = async (
  communityId: string
): Promise<ICommunityPost> => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;

  try {
    const response = await axios.get(
      `/api/api/community/${communityId}`,
      config
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        await refreshTokenAPI();
        return getPostAPI(communityId);
      }
    }
    throw error;
  }
};

export const likePostAPI = async (communityId: number): Promise<void> => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;

  try {
    await axios.post(`/api/api/community/${communityId}/like`, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        await refreshTokenAPI();
        return likePostAPI(communityId);
      }
    }
    throw error;
  }
};

export const unlikePostAPI = async (communityId: number): Promise<void> => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;

  try {
    await axios.post(`/api/api/community/${communityId}/un-like`, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        await refreshTokenAPI();
        return unlikePostAPI(communityId);
      }
    }
    throw error;
  }
};
