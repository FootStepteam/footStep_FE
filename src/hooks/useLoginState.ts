import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const useLoginState = () => {
  const [, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [, setRefreshTokenCookie, removeRefreshTokenCookie] = useCookies([
    "refresh-token",
  ]);
  const navigate = useNavigate();

  const login = (token: string, refreshToken: string) => {
    setCookie("accessToken", token, {
      path: "/",
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1,
    });
    setRefreshTokenCookie("refresh-token", refreshToken, {
      path: "/",
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
  };

  const logout = async () => {
    removeCookie("accessToken", {
      path: "/",
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    removeRefreshTokenCookie("refresh-token", {
      path: "/",
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    navigate("/login");
  };

  return { login, logout };
};
