import { FormEvent } from "react";
import { useSignUpForm } from "../../store/useSignUpForm";
import { signUp } from "../../api/userSignUp";

const SignUpForm = () => {
  const { formData, updateForm } = useSignUpForm();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await signUp(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full h-screen max-w-md mx-auto mt-10 p-6 space-y-4 rounded-lg bg-white-001"
    >
      <div className="flex mx-auto space-x-2">
        <p>성별</p>
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
      <input
        name="loginEmail"
        value={formData.loginEmail}
        onChange={updateForm}
        className="block w-full p-2 border border-black-002 rounded placeholder-gray-001"
        placeholder="이메일"
      />
      <input
        name="nickname"
        value={formData.nickname}
        onChange={updateForm}
        className="block w-full p-2 border border-black-002 rounded placeholder-gray-001"
        placeholder="닉네임"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={updateForm}
        className="block w-full p-2 border border-black-002 rounded placeholder-gray-001"
        placeholder="비밀번호"
      />
      <button
        type="submit"
        className="block w-full p-2 bg-blue-001 text-white-001 rounded hover:bg-blue-002"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
