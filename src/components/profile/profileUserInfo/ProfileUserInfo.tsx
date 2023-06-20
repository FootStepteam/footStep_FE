import { Link } from "react-router-dom";
import { ReactComponent as NoProfile } from "../../../assets/smile.svg";

const ProfileUserInfo = () => {
  return (
    <div className="mt-12 w-[30rem]">
      <div className="m-center p-7 w-[17rem] border border-1 rounded-xl">
        <div className="flex justify-center">
          <NoProfile width={150} height={150} className="rounded-full" />
        </div>
        <section className="w-[13rem] mt-8">
          <div className="mb-4 w-[13rem]">
            <h1 className="font-bold text-lg">닉네임</h1>
            <div className="h-8">덩두3</div>
          </div>
          <div className="mb-4 w-[13rem]">
            <h1 className="font-bold text-lg">이메일</h1>
            <div className="h-8 tracking-[-0.5px]">tjdwn9753@gmail.com</div>
          </div>
          <div className="w-[13rem]">
            <h1 className="font-bold text-lg">내 소개</h1>
            <div className="w-[13rem] h-[7rem] overflow-hidden text-ellipsis">
              안녕하세요 저는
              누구누구입니다.asdasdasdddddddddddddasdasdasdasasdasdasdasdasdasdasdasdddddasdasd
              asdasdasdddddddddddddasdasdasdasasdasdasdasdasdasdasdasdddddasdasd
              asdasdasdddddddddddddasdasdasdasasdasdasdasdasdasdasdasdddddasdasd
              asdasdasdddddddddddddasdasdasdasasdasdasdasdasdasdasdasdddddasdasd
              asdasdasdddddddddddddasdasdasdasasdasdasdasdasdasdasdasdddddasdasd
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-4 ">
          <Link
            to="/user/profile/edit"
            className="px-3 py-2 border border-sky-005 rounded-md text-xs text-gray-400"
            role="button"
          >
            편집
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserInfo;
