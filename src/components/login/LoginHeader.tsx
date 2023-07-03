import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <>
      <Link
        to="/"
        className="mx-auto min-w-max font-black text-[56px]"
      >
        Logo
      </Link>
      <div className="mt-1 mx-auto min-w-max text-[20px] text-placeholder-color">
        함께하는 여행 계획 - 발자국
      </div>
    </>
  );
};
export default LoginHeader;
