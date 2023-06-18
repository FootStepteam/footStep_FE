import { useEffect } from "react";
import { getKakaoAccessToken } from "../../api/kakaoLoginAPI";
import { useLoginState } from "../../hooks/useLoginState";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert2 import

const KakaoCallBack = () => {
  const { login } = useLoginState();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");
    console.log(authCode);

    if (authCode) {
      const fetchAccessToken = async () => {
        try {
          const authResponseData = await getKakaoAccessToken(authCode);
          console.log("authResponseData: ", authResponseData);

          const accessToken = authResponseData.jwtAccessToken;
          console.log("accessToken: ", accessToken);

          // loginState에서 호출(jwtAccessToken header에 저장)
          login(accessToken);

          // SweetAlert2를 사용해서 1초 후에 "홈으로 돌아가기" 버튼을 보여줌
          Swal.fire({
            title: "로그인이 완료되었습니다!",
            text: "홈으로 돌아갈 준비가 되었습니다.",
            icon: "success",
            confirmButtonText: "홈으로 돌아가기",
            preConfirm: () => window.location.reload(), // 버튼을 클릭하면 페이지 새로고침
          });
        } catch (error) {
          // console.error(error);
        }
      };

      fetchAccessToken();
    }
  }, []);

  return (
    <div>
      <Link to="/">
        <button type="button">홈으로 돌아가기</button>
      </Link>
    </div>
  );
};

export default KakaoCallBack;
