import axios from "axios";

export const getKakaoAccessToken = async (authCode: string) => {
  const response = await axios.post(
    "http://43.200.76.174:8080/api/auth/kakao",
    {
      authorizationCode: authCode,
    }
  );
  return response.data;
};
