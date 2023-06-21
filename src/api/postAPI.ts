import axios from "axios";
import { ICommunityPost } from "../type/communityPage";

export const getPostAPI = async (
  communityId: string
): Promise<ICommunityPost> => {
  const response = await axios.get(`/api/api/community/${communityId}`);
  return response.data;
};
