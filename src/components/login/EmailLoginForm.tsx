import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  email: string;
  password: string;
};

const EmailLoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleEmailLogin = async (data: FormData) => {
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
      <div className="flex flex-col mx-auto w-full">
        <p>이메일</p>
        <input
          className="w-full mt-4 border-b-2"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <p>비밀번호</p>
        <input
          className="w-full mt-4 border-b-2"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button
        className="flex w-40 mt-4 p-2 mx-auto bg-main-color rounded-lg"
        type="submit"
      >
        로그인
      </button>
    </form>
  );
};

export default EmailLoginForm;
