import { useEffect } from "react";
import axios from "axios";
import { useLoginState } from "../../state/loginState";

const KAKAO_AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize?client_id=361fc4d12b75888a392207252d5db496&redirect_uri=http://43.200.76.174:8080/api/kakao/callback&response_type=code";

const KakaoLoginButton = () => {
  const { login } = useLoginState();
  const handleKakaoLogin = async () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");

    if (authCode) {
      const getAccessToken = async () => {
        try {
          const authResponse = await axios.post(
            "http://43.200.76.174:8080/api/auth/kakao",
            {
              authorizationCode: authCode,
            }
          );

          const accessToken = authResponse.data.jwtAccessToken;

          // loginState에서 호출(jwtAccessToken header에 저장)
          login(accessToken);

          console.log(authResponse.data);
        } catch (error) {
          console.error(error);
        }
      };

      getAccessToken();
    }
  }, []);

  return (
    <button type="button" className="mx-auto" onClick={handleKakaoLogin}>
      <img src="./kakao_login_medium_narrow.png" alt="" />
    </button>
  );
};

export default KakaoLoginButton;
