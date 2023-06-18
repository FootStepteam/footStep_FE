import { useRecoilState } from "recoil";
import axios from "axios";
import { jwtAccessTokenState } from "../state/loginState";
import { useRecoilValue } from "recoil";
import { lastLocationState } from "../state/lastLocationState";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getTokenInCookies } from "../auth/auth";

export const useLoginState = () => {
  const [jwtAccessToken, setJwtAccessToken] =
    useRecoilState(jwtAccessTokenState);
  const lastLocation = useRecoilValue(lastLocationState);
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const login = (token: string) => {
    setJwtAccessToken(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    setCookie("accessToken", token, { maxAge: 60 * 60 * 12 }); // 임시로 12시간 설정
    // console.log("Access Token saved: ", token);
    // console.log(
    //   "Axios default header: ",
    //   axios.defaults.headers.common.Authorization
    // );
    console.log(token);
    // 로그인 후 이전 위치로 이동
    navigate(lastLocation);
  };

  const logout = () => {
    setJwtAccessToken("anonymous");
    delete axios.defaults.headers.common.Authorization;

    // Logout 시 쿠키에서 accessToken 삭제
    removeCookie("accessToken");
  };

  return { jwtAccessToken, login, logout };
};
