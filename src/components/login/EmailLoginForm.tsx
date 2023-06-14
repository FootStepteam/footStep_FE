import { useForm } from "react-hook-form";
import axios from "axios";

type TFormData = {
  email: string;
  password: string;
};

const EmailLoginForm = () => {
  const { register, handleSubmit } = useForm<TFormData>();

  const handleEmailLogin = async (data: TFormData) => {
    try {
      // 이메일 로그인 API 호출
      const response = await axios.post("/email/login", {
        email: data.email,
        password: data.password,
      });

      // 로그인 성공시 처리
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
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="my-4">
          <p>비밀번호</p>
          <input
            className="w-full mt-4 border-b-2"
            type="password"
            {...register("password", { required: "Password is required" })}
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
