import { useEffect } from "react";
import { useLoginState } from "../../hooks/useLoginState";
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
          const accessToken = authResponseData?.jwtAccessToken; // 적절한 accessToken 속성에 접근
          console.log(accessToken); // accessToken 출력 확인
          if (accessToken) {
            login(accessToken); // login 함수 호출
          } else {
            // accessToken이 없을 경우 처리
            console.error("Access Token not found");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchAccessToken();
    }
  }, []);
  return <div>Redirecting...</div>;
};

export default KakaoCallBack;
