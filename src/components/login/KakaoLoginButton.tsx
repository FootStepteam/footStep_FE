import { kakaoLogin } from "../../api/kakaoLoginAPI";

const KakaoLoginButton = () => {
  return (
    <div className="flex min-w-max">
      <button type="button" className="mx-auto" onClick={kakaoLogin}>
        <img src="./kakao_login_medium_narrow.png" alt="" />
      </button>
    </div>
  );
};

export default KakaoLoginButton;
