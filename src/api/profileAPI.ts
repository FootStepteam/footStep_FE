import axios from "axios";

export const getUserInfo = async (accessToken: string): Promise<IMember> => {
  const response = await axios.get<IMember>(`/api/api/members/${accessToken}`);
  return response.data;
};

export const updateMemberProfile = async (formData: any, memberId?: number) => {
  const response = await axios.put(`/api/api/members/`, formData, {
    params: { memberId },
  });
  return response.data;
};
