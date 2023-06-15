// components/SignUpForm.tsx
import { FormEvent } from "react";
import axios from "axios";
import { useSignUpForm } from "../../store/signUpForm";

const SignUpForm = () => {
  const { formData, updateForm } = useSignUpForm();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/members/sign-up", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="gender"
        value={formData.gender}
        onChange={updateForm}
        className="block w-full p-2 border rounded"
        placeholder="Gender"
      />
      <input
        name="loginEmail"
        value={formData.loginEmail}
        onChange={updateForm}
        className="block w-full p-2 border rounded"
        placeholder="Email"
      />
      <input
        name="nickname"
        value={formData.nickname}
        onChange={updateForm}
        className="block w-full p-2 border rounded"
        placeholder="Nickname"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={updateForm}
        className="block w-full p-2 border rounded"
        placeholder="Password"
      />
      <button
        type="submit"
        className="block w-full p-2 bg-blue-500 text-white rounded"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
