import axios from "axios";
import { PlanSchedule } from "../type/newPost";

export const getPlanScheduleAPI = async (
  shareId: number
): Promise<PlanSchedule> => {
  const response = await axios.get(`/api/room/${shareId}/schedule`);
  return response.data[0];
};

export const postCommunityAPI = async (
  memberId: number,
  shareId: number,
  title: string,
  isPublic: boolean,
  content: string
) => {
  const response = await axios.post("/api/api/community", {
    memberId,
    shareId,
    communityName: title,
    communityPublicState: isPublic,
    content: content,
  });

  console.log(response.data);
};

export const getMemberIdAPI = async (accessToken: string): Promise<number> => {
  const response = await axios.get(`/api/api/members/${accessToken}`);
  return response.data.memberId;
};
