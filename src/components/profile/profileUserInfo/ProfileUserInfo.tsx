import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NoProfile } from "../../../assets/smile.svg";
import { getUserInfo } from "../../../api/profileAPI";
import { getCookie } from "../../../utils/cookie";

const ProfileUserInfo = () => {
  const [userInfo, setUserInfo] = useState<IMember | null>(null);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo(accessToken);
        setUserInfo(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
  }, [accessToken]);
  return (
    <div className="mt-12 w-[30rem]">
      <div className="m-center p-7 w-[17rem] border border-1 rounded-xl">
        <div className="flex justify-center">
          {userInfo?.img ? (
            <img
              src={userInfo.img}
              alt="User"
              width={150}
              height={150}
              className="rounded-full"
            />
          ) : (
            <NoProfile width={150} height={150} className="rounded-full" />
          )}
        </div>
        <section className="w-[13rem] mt-8">
          <div className="mb-4 w-[13rem]">
            <h1 className="font-bold text-lg">닉네임</h1>
            <div className="h-8">{userInfo?.nickname}</div>
          </div>
          <div className="mb-4 w-[13rem]">
            <h1 className="font-bold text-lg">이메일</h1>
            <div className="h-8 tracking-[-0.5px]">{userInfo?.loginEmail}</div>
          </div>
          <div className="w-[13rem]">
            <h1 className="font-bold text-lg">내 소개</h1>
            <div className="w-[13rem] h-[7rem] overflow-hidden text-ellipsis">
              안녕하세요 저는 {userInfo?.nickname}입니다.
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
