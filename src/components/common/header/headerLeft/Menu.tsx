import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useRequireAuth } from "../../../../hooks/useRequireAuth";

const menus = [
  {
    menu: "About",
    path: "/",
  },
  {
    menu: "여행일정",
    path: "/planShareEntrance",
  },
  {
    menu: "커뮤니티",
    path: "/community",
  },
  {
    menu: "FAQ",
    path: "/",
  },
];

const Menu = () => {
  const restrictedPages = [
    "/planShareEntrance",
    "/user/profile",
    "/user/profile/edit",
  ];
  useRequireAuth(restrictedPages);

  const [cookies] = useCookies(["accessToken"]);
  const [auth, setAuth] = useState(cookies.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuth(cookies.accessToken);
  });

  const onClickHandler = (path: string) => {
    if (!auth && path === "/planShareEntrance") {
      Swal.fire({
        icon: "info",
        title: "로그인 후 이용 가능합니다.",
        showConfirmButton: true,
      });
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex grow">
      {menus.map((element, index) => (
        <div
          key={element.menu}
          onClick={() => onClickHandler(element.path)}
          className={`flex grow justify-center items-center text-[1.3rem] rounded-lg font-semibold cursor-pointer transition-all duration-150 ${
            location.pathname === "/"
              ? "hover:bg-white-001 hover:text-black-001"
              : "hover:bg-sky-005 hover:text-white-001"
          }`}
        >
          {element.menu}
        </div>
      ))}
    </div>
  );
};

export default Menu;
