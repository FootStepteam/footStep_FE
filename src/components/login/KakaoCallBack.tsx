import { useEffect } from "react";
import { useLoginState } from "../../state/loginState";
import axios from "axios";

const KakaoCallBack = () => {
  const { login } = useLoginState();
  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");

    if (authCode) {
      // console.log(authCode); authCode 들어오는지 확인
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

          // console.log(authResponse.data);
        } catch (error) {
          // console.error(error);
        }
      };

      getAccessToken();
    }
  }, []);
  return <div>Redirecting...</div>;
};

export default KakaoCallBack;
