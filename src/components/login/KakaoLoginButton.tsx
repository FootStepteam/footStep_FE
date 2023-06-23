import { kakaoLogin } from "../../api/kakaoLoginAPI";

const KakaoLoginButton = () => {
  return (
    <button type="button" className="mx-auto" onClick={kakaoLogin}>
      <img src="./kakao_login_medium_narrow.png" alt="" />
    </button>
  );
};

export default KakaoLoginButton;
