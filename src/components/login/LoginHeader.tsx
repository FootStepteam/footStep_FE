import { Link } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../../assets/leftArrow.svg";

const LoginHeader = () => {
  return (
    <>
      <div className="flex justify-start items-center ml-4 w-[100px] h-[40px] border rounded-lg hover:bg-orange-005 transition-all duration-150">
        <Link to="/" className="flex">
          <LeftArrow width={20} height={20} className="relative top-0.5 ml-1" />
          <div className="flex content-center ml-2">돌아가기</div>
        </Link>
      </div>
      <div className="mx-auto min-w-max font-black text-[56px]">LOG IN</div>
      <div className="mt-1 mx-auto min-w-max text-[20px] text-placeholder-color">
        함께하는 여행 계획 - 발자국
      </div>
    </>
  );
};
export default LoginHeader;
