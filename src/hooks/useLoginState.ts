import { useRecoilState } from "recoil";
import axios from "axios";
import { jwtAccessTokenState } from "../state/loginState";
import { useCookies } from "react-cookie";

export const useLoginState = () => {
  const [jwtAccessToken, setJwtAccessToken] =
    useRecoilState(jwtAccessTokenState);

  const [, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [, setRefreshTokenCookie, removeRefreshTokenCookie] = useCookies(["refresh-token"]);

  const login = (token: string, refreshToken: string) => {
    setJwtAccessToken(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    setCookie("accessToken", token, { maxAge: 60 * 60 * 12 }); // 임시로 12시간 설정
    setRefreshTokenCookie("refresh-token", refreshToken, { maxAge: 60 * 60 * 24 * 7});
  };

  const logout = () => {
    setJwtAccessToken("anonymous");
    delete axios.defaults.headers.common.Authorization;

    // Logout 시 쿠키에서 accessToken 삭제
    removeCookie("accessToken");
    removeRefreshTokenCookie("refresh-token");
  };

  return { jwtAccessToken, login, logout };
};
