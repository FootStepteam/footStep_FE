import { useCookies } from "react-cookie";
import axios from "axios";

export const useLoginState = () => {
  const [, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [, setRefreshTokenCookie, removeRefreshTokenCookie] = useCookies([
    "refresh-token",
  ]);

  const login = (token: string, refreshToken: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    setCookie("accessToken", token, { maxAge: 60 * 60 * 1 });
    setRefreshTokenCookie("refresh-token", refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
    });
  };

  const logout = () => {
    delete axios.defaults.headers.common.Authorization;

    // Logout 시 쿠키에서 accessToken 삭제
    removeCookie("accessToken");
    removeRefreshTokenCookie("refresh-token");
  };

  return { login, logout };
};
