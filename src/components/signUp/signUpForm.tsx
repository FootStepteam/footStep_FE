import { FormEvent, useState } from "react";
import { useSignUpForm } from "../../store/useSignUpForm";
import { signUp, checkEmailDuplication } from "../../api/userSignUp";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
    <div className="pt-[112px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-screen max-w-md mx-auto mt-10 p-6 space-y-4 rounded-lg bg-white-001 shadow-lg"
      >
        <div className="flex p-2 mx-auto space-x-2 border border-gray-003 rounded-lg text-black-002 text-lg">
          <p className="mr-8">성별</p>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={updateForm}
              className="mr-2"
            />
            남자
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={updateForm}
              className="mr-2"
            />
            여자
          </label>
        </div>
        <div className="flex">
          <input
            type="email"
            name="loginEmail"
            value={formData.loginEmail}
            onChange={updateForm}
            disabled={emailValid}
            className="block w-full p-2 border border-gray-003 rounded-l-lg placeholder-gray-001 font-NanumGothic"
            placeholder="이메일"
          />
          <button
            type="button"
            onClick={handleCheckEmail}
            disabled={emailValid}
            className="p-1 min-w-max rounded-r-lg bg-blue-003 text-white-001"
          >
            중복
            <br />
            확인
          </button>
        </div>
        <input
          name="nickname"
          value={formData.nickname}
          onChange={updateForm}
          className="block w-full p-2 border border-gray-003 rounded-lg placeholder-gray-001 font-NanumGothic"
          placeholder="닉네임"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={updateForm}
          className="block w-full p-2 border border-gray-003 rounded-lg placeholder-gray-001 font-NanumGothic"
          placeholder="비밀번호"
        />
        <button
          type="submit"
          className="block w-full p-2 bg-blue-002 text-white-001 rounded-lg hover:bg-blue-003 transition-colors duration-200 font-DoHyeon text-lg"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
