import React from "react";
import EmailLoginForm from "../components/login/EmailLoginForm";
import KakaoLoginButton from "../components/login/KakaoLoginButton";

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="mt-[12rem] flex flex-col">
        <div className="mx-auto font-black text-[56px]">LOG IN</div>
        <div className="mt-1 mx-auto text-[20px] text-placeholder-color">
          함께하는 여행 계획 - 발자국
        </div>

        <EmailLoginForm />

        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
