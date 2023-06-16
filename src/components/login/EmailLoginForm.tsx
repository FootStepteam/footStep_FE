import { useForm } from "react-hook-form";
import axios from "axios";
import { TLoginFormData } from "../../type/emailLogin";
import { useLoginState } from "../../state/loginState";

const EmailLoginForm = () => {
  const { register, handleSubmit } = useForm<TLoginFormData>();
  const { login } = useLoginState();

  const handleEmailLogin = async (data: TLoginFormData) => {
    try {
      const response = await axios.post("/api/api/members/sign-in", {
        loginEmail: data.email,
        password: data.password,
      });

      // response로 받아온 jwtAccessToken 저장
      const accessToken = response.data.jwtAccessToken;

      // loginState에서 호출(jwtAccessToken header에 저장)
      login(accessToken);

      console.log(response.data);
    } catch (error) {
      // 로그인 실패시 처리
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEmailLogin)}>
      <div className="flex flex-col my-[40px] mx-auto w-1/4">
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
