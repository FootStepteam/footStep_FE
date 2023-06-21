import axios from "axios";
import {
  ICommentCreateForm,
  ICommentUpdateForm,
  ICommunityData,
  IGetCommunityParams,
} from "../type/communityPage";

export const getCommunityAPI = async (
  params?: IGetCommunityParams
): Promise<ICommunityData> => {
  const response = await axios.get("/api/api/community", { params });
  return response.data;
};

export const createComment = async (
  form: ICommentCreateForm,
  memberId: number
) => {
  const response = await axios.post(
    `/api/api/community/${form.communityId}/comments?memberId=${memberId}`,
    form
  );
  return response.data;
};

export const updateComment = async (
  commentId: number,
  form: ICommentUpdateForm
) => {
  const response = await axios.put(`/api/api/comments/${commentId}`, form);
  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await axios.delete(`/api/api/comments/${commentId}`);
  return response.data;
};
