const KAKAO_AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize?client_id=361fc4d12b75888a392207252d5db496&redirect_uri=http://localhost:5173/user/kakao/callback&response_type=code";

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button type="button" className="mx-auto" onClick={handleKakaoLogin}>
      <img src="./kakao_login_medium_narrow.png" alt="" />
    </button>
  );
};

export default KakaoLoginButton;
