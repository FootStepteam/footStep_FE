import axios from "axios";

export const getUserInfo = async (accessToken: string): Promise<IMember> => {
  const response = await axios.get<IMember>(`/api/api/members/${accessToken}`);
  return response.data;
};
