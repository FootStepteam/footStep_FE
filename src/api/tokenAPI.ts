import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

export const checkTokenAPI = async (token: string) => {
  try {
    const response = await axios.post(`/api/api/auth/check-token`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const refreshTokenAPI = async () => {
  const COOKIE_KEY = "refresh-token";
  const refreshToken = getCookie(COOKIE_KEY);

  try {
    const response = await axios.post("/api/api/auth/refresh", {
      headers: {
        Cookie: refreshToken,
      },
    });

    if (response.status === 200) {
      const accessToken = response.data;

      setCookie("accessToken", accessToken);
    }
    // 재발급 token
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
