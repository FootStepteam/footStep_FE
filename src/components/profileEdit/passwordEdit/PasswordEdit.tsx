import React, { useState } from "react";
import {
  ChangePasswordForm,
  changePasswordAPI,
} from "../../../api/passwordAPI";

const PasswordEdit = () => {
  const [form, setForm] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await changePasswordAPI(form);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-tabInSection">
      <form className="flex flex-col m-center pt-20 w-[20rem]">
        <input
          type="password"
          name="currentPassword"
          placeholder="현재 비밀번호를 입력하세요."
          className="p-4 border border-gray-002 rounded-sm outline-none placeholder:text-sm"
          value={form.currentPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="새로운 비밀번호"
          className="mt-2 p-4 border border-gray-002 rounded-sm outline-none placeholder:text-sm"
          value={form.newPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 재확인"
          className="mt-2 p-4 border border-gray-002 rounded-sm outline-none placeholder:text-sm"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="button"
          className="mt-8 h-16 bg-sky-001 hover:bg-sky-002 rounded-sm text-white text-lg font-bold"
          onClick={handleClick}
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default PasswordEdit;
