import React from "react";
import axios from "axios";

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

// 카카오 로그인 URL
const KAKAO_URL = "https://kauth.kakao.com/oauth/token";

// 카카오 로그인 함수
const loginWithKakao = async (code: string) => {
  try {
    const response = await axios.post<KakaoTokenResponse>(KAKAO_URL, {
      grant_type: "authorization_code",
      client_id: "YOUR_KAKAO_APP_KEY",
      redirect_uri: "YOUR_REDIRECT_URI",
      code,
    });

    const kakaoToken = response.data.access_token;
    return kakaoToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login with Kakao");
  }
};

const KakaoLoginButton: React.FC = () => {
  const handleKakaoLogin = async () => {
    try {
      // 카카오 로그인 처리
      const kakaoToken = await loginWithKakao("AUTHORIZATION_CODE_FROM_KAKAO");
      console.log(kakaoToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      className="mt-[5rem] mx-auto"
      onClick={handleKakaoLogin}
    >
      <img src="./kakao_login_large_narrow.png" alt="" />
    </button>
  );
};

export default KakaoLoginButton;
