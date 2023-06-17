import { useEffect } from "react";
import { useLoginState } from "../../state/loginState";
import { getKakaoAccessToken } from "../../api/kakaoLoginAPI";

const KakaoCallBack = () => {
  const { login } = useLoginState();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");

    if (authCode) {
      const fetchAccessToken = async () => {
        try {
          const authResponseData = await getKakaoAccessToken(authCode);

          const accessToken = authResponseData.jwtAccessToken;

          // loginState에서 호출(jwtAccessToken header에 저장)
          login(accessToken);

          // console.log(authResponseData);
        } catch (error) {
          // console.error(error);
        }
      };

      fetchAccessToken();
    }
  }, []);
  return <div>Redirecting...</div>;
};

export default KakaoCallBack;
