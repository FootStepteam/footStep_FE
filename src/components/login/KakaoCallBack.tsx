// KakaoCallback.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../../hooks/useLoginState";
import { getKakaoToken } from "../../api/kakaoLoginAPI";

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useLoginState();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      getKakaoToken(code).then(({ jwtAccessToken, refreshToken }) => {
        console.log(jwtAccessToken, refreshToken);

        login(jwtAccessToken, refreshToken);
        navigate("/");
      });
    }
  }, [login, navigate]);

  return <div>Logging in...</div>;
};

export default KakaoCallback;
