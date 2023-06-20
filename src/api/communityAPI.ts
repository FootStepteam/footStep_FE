import axios from "axios";

export const getCommunityAPI = async (
  params?: IGetCommunityParams
): Promise<ICommunityData> => {
  const response = await axios.get("/api/api/community", { params });
  return response.data;
};
