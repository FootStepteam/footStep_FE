import { Link } from "react-router-dom";

const SignInAndUp = () => {
  return (
    <div className="flex justify-center items-center w-44 h-10 rounded-[1rem] bg-main-color font-bold text-white">
      <Link to="/login" className="font-medium text-[1.05rem] cursor-pointer">
        로그인 / 회원가입
      </Link>
    </div>
  );
};

export default SignInAndUp;
