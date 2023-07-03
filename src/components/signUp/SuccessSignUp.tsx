import { Link } from "react-router-dom";

const SuccessSignUp = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col justify-center items-center mt-[20rem] mx-auto w-[30rem]">
        <p>LOGO</p>
        <p className="mb-6 text-3xl font-bold">환영합니다 !</p>
        <p className="mb-2 text-xl">회원가입을 축하드립니다.</p>
        <p className="mb-2 text-xl">지금 바로 발자국 서비스를 이용해볼까요?</p>
        <div className="flex justify-center mt-8">
          <Link
            to={"/"}
            className="block mx-4 px-4 py-4 bg-blue-003 hover:bg-blue-004 rounded-md text-xl text-white"
          >
            홈페이지
          </Link>
          <Link
            to={"/login"}
            className="block mx-4 px-4 py-4 bg-blue-003 hover:bg-blue-004 rounded-md text-xl text-white"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessSignUp;
