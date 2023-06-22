import { Link } from "react-router-dom";
import { useLastLocation } from "../../../../hooks/useLastLocation";

const SignInAndUp = () => {
  const saveLastLocation = useLastLocation();

  return (
    <div className="flex justify-center items-center w-44 h-10 rounded-[2rem] bg-blue-001 font-bold text-white">
      <Link
        to="/login"
        className="font-medium text-[1.05rem] cursor-pointer"
        onClick={() => saveLastLocation()}
      >
        로그인 / 회원가입
      </Link>
    </div>
  );
};

export default SignInAndUp;
