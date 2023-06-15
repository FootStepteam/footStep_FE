import { atom, useRecoilState } from "recoil";
import axios from "axios";

// 전역 상태로 사용할 atom을 정의합니다.
// 초기값은 null로, 로그인이 되어있지 않음을 의미합니다.
export const jwtAccessTokenState = atom<string | null>({
  key: "jwtAccessTokenState",
  default: null,
});

// 로그인 상태를 업데이트하는 함수와, 현재 상태를 읽어오는 함수를 제공하는 커스텀 hook입니다.
export const useLoginState = () => {
  const [jwtAccessToken, setJwtAccessToken] =
    useRecoilState(jwtAccessTokenState);

  const login = (token: string) => {
    setJwtAccessToken(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const logout = () => {
    setJwtAccessToken(null);
    delete axios.defaults.headers.common.Authorization;
  };

  return { jwtAccessToken, login, logout };
};
