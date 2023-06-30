import { Link } from "react-router-dom";
import { MouseEvent, FunctionComponent } from "react";
import { useLoginState } from "../../../../hooks/useLoginState";
import Swal from "sweetalert2";

const AfterLogin: FunctionComponent = () => {
  const { logout } = useLoginState();

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-[4rem] font-semibold">
      <div>
        <button
          type="button"
          className={`px-4 py-2 h-[4rem] border-r hover:bg-sky-005 hover:text-white-001 transition-all duration-150 ${
            location.pathname === "/"
              ? "hover:bg-white-001 hover:text-black-001"
              : ""
          }`}
        >
          <Link to="/user/profile">마이페이지</Link>
        </button>
        <button
          type="button"
          className={`px-4 py-2 h-[4rem] hover:bg-sky-005 hover:text-white-001 transition-all duration-150 ${
            location.pathname === "/"
              ? "hover:bg-white-001 hover:text-black-001"
              : ""
          }`}
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default AfterLogin;
