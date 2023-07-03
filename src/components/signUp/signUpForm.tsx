import { FormEvent, useState } from "react";
import { useSignUpForm } from "../../store/useSignUpForm";
import { signUp, checkEmailDuplication } from "../../api/userSignUp";
import { kakaoLogin } from "../../api/kakaoLoginAPI";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Kakao } from "../../assets/kakao.svg";
import Swal from "sweetalert2";

const SignUpForm = () => {
  const { formData, updateForm } = useSignUpForm();
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(false);

  // 이메일 형식 확인 함수
  const isEmailValid = (email: string) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // 필드 확인
    if (!formData.loginEmail || !formData.nickname || !formData.password) {
      Swal.fire({
        title: "모두 작성하셔야 회원가입할 수 있습니다",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    // 이메일 중복확인
    if (!emailValid) {
      Swal.fire({
        title: "이메일 중복 확인을 해야합니다",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    try {
      const response = await signUp(formData);
      console.log(response);

      Swal.fire({
        title: "회원가입이 완료되었습니다",
        icon: "success",
        confirmButtonText: "확인",
      });

      navigate("/");
    } catch (error) {
      // 400 에러 발생시 알림
      const err = error as any;
      if (err.response && err.response.status === 400) {
        Swal.fire({
          title: "이미 사용중인 닉네임입니다",
          icon: "error",
          confirmButtonText: "확인",
        });
      } else {
        console.error(error);
      }
    }
  };

  const handleCheckEmail = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // 이메일 형식 확인
    if (!isEmailValid(formData.loginEmail)) {
      Swal.fire({
        title: "이메일 형식을 확인해주세요",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    try {
      const duplication = await checkEmailDuplication(formData.loginEmail);
      if (duplication) {
        Swal.fire({
          title: "이미 사용중인 이메일입니다",
          icon: "error",
          confirmButtonText: "확인",
        });
      } else {
        setEmailValid(true);
        Swal.fire({
          title: "가입 가능한 이메일입니다",
          icon: "success",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-[10rem] mx-auto w-[20rem]">
      <h1 className="mb-12 text-black-002 font-bold text-xl">회원가입</h1>
      <div className="mb-8">
        <p className="flex justify-center mb-2 text-[0.85rem] text-gray-001">
          카카오계정으로 간편 회원가입
        </p>
        <button
          className="flex justify-center items-center mx-auto w-[20rem] h-[3.2rem] bg-yellow-001 hover:bg-yellow-002 rounded-md text-white font-bold"
          onClick={kakaoLogin}
          type="button"
        >
          <Kakao
            width={25}
            height={25}
            className="mr-2"
          />
          카카오계정으로 회원가입
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto w-[20rem] h-screen bg-white"
      >
        <div className="mb-6">
          <label className="block mb-3 font-bold text-black-002">이메일</label>
          <input
            type="email"
            name="loginEmail"
            value={formData.loginEmail}
            onChange={updateForm}
            disabled={emailValid}
            className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-3 font-bold text-black-002">
            비밀번호
          </label>
          <p className="mb-2 text-[0.75rem] text-gray-001">
            영문, 숫자, 특수문자를 포함한 8~16자 비밀번호를 입력해주세요.
          </p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={updateForm}
            className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
            placeholder="비밀번호"
            maxLength={16}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-3 font-bold text-black-002">
            비밀번호 확인
          </label>
          <input
            type="password"
            name="checkPassword"
            value={formData.password}
            onChange={updateForm}
            className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
            placeholder="비밀번호 확인"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-3 font-bold text-black-002">닉네임</label>
          <p className="mb-2 text-[0.8rem] text-gray-001">
            닉네임을 2자 이상 10자 이하로 입력해주세요.
          </p>
          <input
            name="nickname"
            value={formData.nickname}
            onChange={updateForm}
            className="w-full px-4 py-3 border border-gray-003 outline-none rounded-md placeholder:text-gray-002 placeholder:text-sm"
            placeholder="별명 (2~10자)"
          />
        </div>
        <div className="mb-12">
          <p className="mb-3 font-bold text-black-002">성별</p>
          <div className="flex w-full">
            <button
              type="button"
              className="grow py-3 border border-gray-003 hover:border-blue-004 rounded-l-md hover:bg-blue-004 font-bold hover:text-white transition-colors duration-100"
            >
              남성
            </button>
            <button
              type="button"
              className="grow py-3 border-t border-r border-b border-gray-003 hover:border-blue-004 font-bold hover:text-white rounded-r-md hover:bg-blue-004 transition-colors duration-100"
            >
              여성
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="block w-full p-3 bg-blue-002 text-white-001 rounded-md hover:bg-blue-003 text-lg font-bold transition-colors duration-100"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
