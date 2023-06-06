import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // 카카오톡 로그인 API 호출
      const response = await axios.post("/kakao/login");

      // 로그인 성공시 처리
      console.log(response.data);
    } catch (error) {
      // 로그인 실패시 처리
      setError("로그인에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="mt-[12rem] flex flex-col">
        <div className="mx-auto font-black text-[72px]">LOG IN</div>
        <div className="mt-[1rem] mx-auto text-[20px] text-placeholder-color">
          함께하는 여행 계획 - 발자국
        </div>
        <button className="mt-[5rem] mx-auto" onClick={handleLogin}>
          <img src="./kakao_login_large_narrow.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
