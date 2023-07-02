import axios from "axios";
import { getCookie } from "../utils/cookie";
import {
  ICommentCreateForm,
  ICommentUpdateForm,
  ICommunityData,
  IGetCommunityParams,
} from "../type/communityPage";
import { refreshTokenAPI } from "./shareRoomAPI";

export const getCommunityAPI = async (
  params?: IGetCommunityParams
): Promise<ICommunityData> => {
  const KEY = "accessToken";
  let token = getCookie(KEY);

  const config = {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };

  try {
    const response = await axios.get("/api/api/community", config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        await refreshTokenAPI();
        token = getCookie(KEY);
        config.headers = token
          ? { Authorization: `Bearer ${token}` }
          : undefined;
        const response = await axios.get("/api/api/community", config);
        return response.data;
      }
    }
  }
  return { communities: [], lastPage: false };
};

export const createComment = async (
  form: ICommentCreateForm,
  memberId: number
) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.post(
      `/api/api/community/${form.communityId}/comments?memberId=${memberId}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        refreshTokenAPI();
        createComment(form, memberId);
      }
    }
  }
};

export const updateComment = async (
  commentId: number,
  form: ICommentUpdateForm
) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.put(`/api/api/comments/${commentId}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        refreshTokenAPI();
        updateComment(commentId, form);
      }
    }
  }
};

export const deleteComment = async (commentId: number) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.delete(`/api/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseErrorCode = error.response?.data.code;
      if (responseErrorCode === "EXPIRED_ACCESS_TOKEN") {
        refreshTokenAPI();
        deleteComment(commentId);
      }
    }
  }
};
