import { Link } from "react-router-dom";
import EmailLoginForm from "../components/login/EmailLoginForm";
import KakaoLoginButton from "../components/login/KakaoLoginButton";

const LoginPage = () => {
  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="mt-[12rem] flex flex-col w-full">
        <div className="mx-auto font-black text-[56px]">LOG IN</div>
        <div className="mt-1 mx-auto text-[20px] text-placeholder-color">
          함께하는 여행 계획 - 발자국
        </div>
        <EmailLoginForm />
        <KakaoLoginButton />
        <div className="flex justify-center mt-8">
          <p>아직 회원이 아니신가요?</p>
          <Link to="/user/register">
            <p className="ml-2 text-skyblue-1 font-medium">회원가입</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
