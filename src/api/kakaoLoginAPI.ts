import axios from "axios";

export const kakaoLogin = () => {
  window.location.assign(
    `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`
  );
};

export const getKakaoToken = async (authorizationCode: string) => {
  try {
    const response = await axios.post(
      `http://43.200.76.174:8080/api/auth/kakao`, // API 문서의 인증 경로를 사용
      {
        authorizationCode,
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Failed to get token: ${error}`);
  }
};
