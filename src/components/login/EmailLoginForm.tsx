//EmailLoginForm.tsx
import { useForm } from "react-hook-form";
import { TLoginFormData } from "../../type/emailLogin";
import { signInWithEmail } from "../../api/emailLoginAPI";
import { useLoginState } from "../../hooks/useLoginState";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // 이 줄을 추가하세요
import { AxiosError } from "axios";

const EmailLoginForm = () => {
  const { register, handleSubmit } = useForm<TLoginFormData>();
  const { login } = useLoginState();
  const savedLocation = sessionStorage.getItem("lastLocation");
  const navigate = useNavigate();
  const handleEmailLogin = async (data: TLoginFormData) => {
    try {
      const responseData = await signInWithEmail(data);

      // response로 받아온 jwtAccessToken 저장
      const accessToken = responseData.jwtAccessToken;
      const refreshToken = responseData.refreshToken;

      // loginState에서 호출(jwtAccessToken header에 저장)
      login(accessToken, refreshToken);
      // 로그인 전 페이지로 이동
      if (savedLocation) {
        navigate(savedLocation);
      }
      if (!savedLocation) {
        navigate("/");
      }
    } catch (error) {
      // 로그인 실패시 처리
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        Swal.fire({
          title: "로그인 실패!",
          text: "아이디와 비밀번호를 다시 확인해주세요",
          icon: "error",
          confirmButtonText: "확인",
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEmailLogin)}>
      <div className="flex flex-col my-[40px] mx-auto min-w-max w-[20rem]">
        <div className="my-4">
          <p>이메일</p>
          <input
            className="w-full mt-4 border-b-2"
            type="email"
            {...register("email", { required: "이메일을 입력해주세요" })}
          />
        </div>
        <div className="my-4">
          <p>비밀번호</p>
          <input
            className="w-full mt-4 border-b-2"
            type="password"
            {...register("password", { required: "비밀번호를 입력해주세요" })}
          />
        </div>
      </div>
      <button
        className="flex justify-center items-center w-[183px] h-[45px] my-4 p-2 mx-auto bg-main-color rounded-md"
        type="submit"
      >
        로그인
      </button>
    </form>
  );
};

export default EmailLoginForm;
