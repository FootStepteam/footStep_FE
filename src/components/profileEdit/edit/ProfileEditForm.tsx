import { useEffect, useState } from "react";
import {
  getCurrentUserMemberId,
  getMemberByAccessToken,
} from "../../../api/memberAPI";
import {
  checkNicknameDuplication,
  getProfile,
  updateMemberProfile,
} from "../../../api/profileAPI";
import { ReactComponent as ProfileImage } from "../../../assets/smile.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProfileEditForm = () => {
  const [memberInfo, setMemberInfo] = useState({
    nickname: "",
    img: "",
    email: "",
    description: "",
  });
  const [nicknameValidity, setNicknameValidity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const data = await getMemberByAccessToken();
      const userProfile = await getProfile(data.memberId);
      setMemberInfo({
        nickname: userProfile.nickname,
        img: userProfile.img,
        email: userProfile.loginEmail,
        description: userProfile.description,
      });
    };
    fetchMemberInfo();
  }, []);

  const checkNickname = async () => {
    const nicknameInput = document.getElementById(
      "nickname"
    ) as HTMLInputElement;
    const isAvailable = await checkNicknameDuplication(nicknameInput.value);
    setNicknameValidity(isAvailable);
  };

  const submitHandler = async () => {
    if (nicknameValidity === true) {
      Swal.fire({
        icon: "error",
        title: "중복된 닉네임",
        text: "다른 닉네임을 선택해주세요.",
      });
      return;
    }

    Swal.fire({
      title: "프로필을 수정하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const nicknameInput = document.getElementById(
          "nickname"
        ) as HTMLInputElement;
        const nickname = nicknameInput.value;

        const profileImageInput = document.getElementById(
          "profileImage"
        ) as HTMLInputElement;
        getCurrentUserMemberId();

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

        const introduceInput = document.getElementById(
          "introduce"
        ) as HTMLTextAreaElement;
        const description = introduceInput.value;

        const formData = {
          nickname,
          profileUrl,
          description,
        };

        try {
          await updateMemberProfile(formData);
          Swal.fire(
            "수정 완료!",
            "프로필이 성공적으로 수정되었습니다.",
            "success"
          );
          navigate("/user/profile");
        } catch (error) {
          Swal.fire(
            "오류 발생!",
            "프로필 수정 중 문제가 발생했습니다.",
            "error"
          );
          console.error("Failed to update profile", error);
        }
      }
    });
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
              <button
                type="button"
                className="mt-4 mx-auto w-[18rem] h-[3.2rem] bg-platinum-001 hover:bg-platinum-002 rounded-md text-white font-bold"
                onClick={checkNickname}
              >
                중복확인
              </button>
              {nicknameValidity === false && (
                <p className="text-green-500">사용 가능한 닉네임입니다.</p>
              )}
              {nicknameValidity === true && (
                <p className="text-red-500">중복된 닉네임입니다.</p>
              )}
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
                defaultValue={memberInfo.description}
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
