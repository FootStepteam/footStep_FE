import { Link } from "react-router-dom";
import { useLastLocation } from "../../../../hooks/useLastLocation";

const SignInAndUp = () => {
  const saveLastLocation = useLastLocation();

  return (
    <div className="flex justify-center items-center px-3 py-4 rounded-sm font-bold hover:bg-sky-005 hover:text-white transition-all duration-150">
      <Link
        to="/login"
        className="font-medium text-lg cursor-pointer"
        onClick={() => saveLastLocation()}
      >
        로그인 / 회원가입
      </Link>
    </div>
  );
};

export default SignInAndUp;
