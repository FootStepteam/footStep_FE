import axios from "axios";
import { ICommunityData, IGetCommunityParams } from "../type/communityPage";

export const getCommunityAPI = async (
  params?: IGetCommunityParams
): Promise<ICommunityData> => {
  const response = await axios.get("/api/api/community", { params });
  return response.data;
};
