import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const useRequireAuth = (restrictedPages = ["/login"]) => {
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (restrictedPages.includes(location.pathname) && !cookies.accessToken) {
      Swal.fire({
        icon: "info",
        title: "로그인 후 이용 가능합니다.",
        confirmButtonText: "확인",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [cookies, navigate, restrictedPages, location]);
};
