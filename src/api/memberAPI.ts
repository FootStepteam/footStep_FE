import axios from "axios";

export const getMemberByAccessToken = async (accessToken: string) => {
  try {
    const response = await axios.get("/api/api/members/" + accessToken, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
