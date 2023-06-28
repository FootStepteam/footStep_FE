import { useEffect, useState } from "react";
import {
  getCurrentUserMemberId,
  getMemberByAccessToken,
} from "../../../api/memberAPI";
import { updateMemberProfile } from "../../../api/profileAPI";
import { ReactComponent as ProfileImage } from "../../../assets/smile.svg";

const ProfileEditForm = () => {
  const [memberInfo, setMemberInfo] = useState({
    nickname: "",
    img: "",
    email: "",
  });

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const data = await getMemberByAccessToken();
      setMemberInfo({
        nickname: data.nickname,
        img: data.img,
        email: data.loginEmail,
      });
    };
    fetchMemberInfo();
  }, []);

  const submitHandler = async () => {
    const nicknameInput = document.getElementById(
      "nickname"
    ) as HTMLInputElement;
    const nickname = nicknameInput.value;

    const profileImageInput = document.getElementById(
      "profileImage"
    ) as HTMLInputElement;
    const memberId = await getCurrentUserMemberId();

    let profileUrl = "";
    if (profileImageInput.files && profileImageInput.files.length > 0) {
      const file = profileImageInput.files[0];
      profileUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const formData = {
      nickname,
      profileUrl,
    };

    try {
      const response = await updateMemberProfile(formData, memberId);
      console.log("Profile updated successfully", response);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };
  return (
    <section className="m-center w-commonSection">
      <div className="mt-16">
        <form className="flex flex-col items-center m-center w-96">
          <div className="relative m-center w-[12.5rem] h-[12.5rem]">
            <label
              htmlFor="profileImage"
              className="cursor-pointer hover:opacity-25"
            >
              <ProfileImage width={200} height={200} />
              <input type="file" id="profileImage" className="hidden" />
            </label>
            <button
              type="button"
              className="absolute top-0 right-5 px-2 py-1 bg-red-001 hover:bg-[#F84D4D]  rounded-md text-white text-[0.7rem]"
            >
              삭제
            </button>
          </div>
          <div className="flex flex-col mt-8 w-[18rem]">
            <div className="flex flex-col">
              <label htmlFor="nickname" className="block font-bold text-lg">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                defaultValue={memberInfo.nickname}
                className="mt-2 px-4 py-2 border-gray-003 border rounded-md outline-none"
              />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="email" className="font-bold text-lg">
                이메일
              </label>
              <input
                type="text"
                id="email"
                defaultValue={memberInfo.email}
                disabled
                className="mt-2 px-4 py-2 border-gray-003 border-gray-002 border rounded-md outline-none text-gray-002"
              />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="introduce" className="block font-bold text-lg">
                내 소개
              </label>
              <textarea
                id="introduce"
                defaultValue="덩두"
                className="mt-2 px-4 py-2  h-40 border-gray-003 border-gray-002 border rounded-md outline-none resize-none"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={submitHandler}
            className="my-8 px-4 py-2 bg-blue-002 hover:bg-sky-005 rounded-lg text-lg text-white font-bold "
          >
            수정
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfileEditForm;
