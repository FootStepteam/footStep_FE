import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../../hooks/useLoginState";
import { getKakaoToken } from "../../api/kakaoLoginAPI";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const { login } = useLoginState();
  const savedLocation = sessionStorage.getItem("lastLocation");

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      getKakaoToken(code).then(({ jwtAccessToken, refreshToken }) => {
        login(jwtAccessToken, refreshToken);
        if (savedLocation) {
          navigate(savedLocation);
        }
        if (!savedLocation) {
          navigate("/");
        }
      });
    }
  }, [login, navigate]);

  return <div>Logging in...</div>;
};

export default KakaoCallback;
