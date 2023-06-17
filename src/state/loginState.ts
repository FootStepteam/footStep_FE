import { atom, useRecoilState } from "recoil";
import axios from "axios";
import { useCookies } from "react-cookie";

export const jwtAccessTokenState = atom<string | null>({
  key: "jwtAccessTokenState",
  default: null,
});

export const useLoginState = () => {
  const [jwtAccessToken, setJwtAccessToken] =
    useRecoilState(jwtAccessTokenState);

  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const login = (token: string) => {
    setJwtAccessToken(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    setCookie("accessToken", token, { maxAge: 60 * 60 * 12 }); // 임시로 12시간 설정

    console.log("Access Token saved: ", token);
    console.log(
      "Axios default header: ",
      axios.defaults.headers.common.Authorization
    );
  };

  const logout = () => {
    setJwtAccessToken(null);
    delete axios.defaults.headers.common.Authorization;

    // Logout 시 쿠키에서 accessToken 삭제
    removeCookie("accessToken");
  };

  return { jwtAccessToken, login, logout };
};
