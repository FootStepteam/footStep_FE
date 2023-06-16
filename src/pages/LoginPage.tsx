import EmailLoginForm from "../components/login/EmailLoginForm";
import KakaoLoginButton from "../components/login/KakaoLoginButton";
import LoginHeader from "../components/login/LoginHeader";
import SignUpLink from "../components/login/SignUpLink";

const LoginPage = () => {
  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="mt-[12rem] flex flex-col w-full">
        <LoginHeader />
        <EmailLoginForm />
        <KakaoLoginButton />
<<<<<<< HEAD
        <SignUpLink />
=======
        <div className="flex justify-center mt-8">
          <p>아직 회원이 아니신가요?</p>
          <Link to="/user/signup">
            <p className="ml-2 text-skyblue-1 font-medium">회원가입</p>
          </Link>
        </div>
>>>>>>> e972adc36b64fc59097692dc52c4c5bac4c4f205
      </div>
    </div>
  );
};

export default LoginPage;
