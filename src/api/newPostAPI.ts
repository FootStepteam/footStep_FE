import axios from "axios";
import { IPlanSchedule } from "../type/newPost";
import { getCookie } from "../utils/cookie";
import { getShareRoomInfoAPI, refreshTokenAPI } from "./shareRoomAPI";

export const getPlanScheduleAPI = async (
  shareId: number
): Promise<IPlanSchedule[]> => {
  const KEY = "accessToken";
  const token = getCookie(KEY);
  try {
    const roomInfo = await getShareRoomInfoAPI(String(shareId));
    const startDate = roomInfo.travelStartDate;
    const endDate = roomInfo.travelEndDate;
    console.log(startDate, endDate);
    const response = await axios.get(
      `/api/api/share-room/${shareId}/schedule?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        await refreshTokenAPI();
        return getPlanScheduleAPI(shareId);
      }
    }
    throw error;
  }
};

export const postCommunityAPI = async (
  memberId: number,
  shareId: number,
  title: string,
  isPublic: boolean,
  content: string
): Promise<any> => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.post(
      `/api/api/community?memberId=${memberId}`,
      {
        shareId,
        communityName: title,
        communityPublicState: isPublic,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        await refreshTokenAPI();
        return postCommunityAPI(memberId, shareId, title, isPublic, content);
      }
    }
    throw error;
  }
};

export const getMemberIdAPI = async (): Promise<number> => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.get(`/api/api/members/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.memberId;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        await refreshTokenAPI();
        return getMemberIdAPI();
      }
    }
    throw error;
  }
};
