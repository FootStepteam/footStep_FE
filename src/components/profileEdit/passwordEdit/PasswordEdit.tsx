//PasswordEdit.tsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  ChangePasswordForm,
  changePasswordAPI,
} from "../../../api/passwordAPI";
import { useNavigate } from "react-router-dom";

const PasswordEdit = () => {
  const [form, setForm] = useState<ChangePasswordForm>({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordValidationMsg, setPasswordValidationMsg] =
    useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (form.newPassword && form.confirmPassword) {
      if (form.newPassword !== form.confirmPassword) {
        setPasswordValidationMsg("비밀번호가 일치하지 않습니다");
      } else {
        setPasswordValidationMsg("비밀번호가 일치합니다");
      }
    }
  }, [form.newPassword, form.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (passwordValidationMsg !== "비밀번호가 일치합니다") {
      Swal.fire({
        icon: "error",
        title: "비밀번호 불일치",
        text: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    Swal.fire({
      title: "비밀번호를 변경하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await changePasswordAPI(form);
          console.log(response);
          Swal.fire(
            "변경 완료!",
            "비밀번호가 성공적으로 변경되었습니다.",
            "success"
          );
          navigate("/user/profile");
        } catch (err) {
          console.error(err);
          Swal.fire(
            "오류 발생!",
            "비밀번호 변경 중 문제가 발생했습니다.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="h-tabInSection">
      <form className="flex flex-col m-center pt-20 w-[20rem]">
        <input
          type="password"
          name="newPassword"
          placeholder="새로운 비밀번호"
          className="p-4 border border-gray-002 rounded-sm outline-none placeholder:text-sm"
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
        {form.newPassword && form.confirmPassword && (
          <div
            className={
              passwordValidationMsg === "비밀번호가 일치합니다"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {passwordValidationMsg}
          </div>
        )}
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
