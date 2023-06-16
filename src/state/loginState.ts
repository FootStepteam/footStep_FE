import { atom, useRecoilState } from "recoil";
import axios from "axios";

export const jwtAccessTokenState = atom<string | null>({
  key: "jwtAccessTokenState",
  default: null,
});

export const useLoginState = () => {
  const [jwtAccessToken, setJwtAccessToken] =
    useRecoilState(jwtAccessTokenState);

  const login = (token: string) => {
    setJwtAccessToken(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log("Access Token saved: ", token);
    console.log(
      "Axios default header: ",
      axios.defaults.headers.common.Authorization
    );
  };

  const logout = () => {
    setJwtAccessToken(null);
    delete axios.defaults.headers.common.Authorization;
  };

  return { jwtAccessToken, login, logout };
};
