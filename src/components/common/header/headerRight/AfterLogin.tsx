//AfterLogin.tsx
import { Link } from "react-router-dom";
import { MouseEvent, FunctionComponent } from "react";
import { ReactComponent as NoProfile } from "../../../../assets/smile.svg";
import { useLoginState } from "../../../../hooks/useLoginState";
import Swal from "sweetalert2";

const AfterLogin: FunctionComponent = () => {
  const { logout } = useLoginState();

  const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
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
    <div className="flex justify-center items-center font-semibold">
      <Link
        to="/user/profile"
        className="mr-5"
      >
        마이페이지
      </Link>
      <Link
        to="/"
        className="mr-5"
        onClick={handleLogout}
      >
        로그아웃
      </Link>
    </div>
  );
};

export default AfterLogin;
