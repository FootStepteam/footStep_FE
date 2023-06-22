// Menu.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      {menus.map((element) => (
        <div
          key={element.menu}
          onClick={() => onClickHandler(element.path)}
          className="flex grow justify-center items-center text-[1.3rem] font-semibold cursor-pointer"
        >
          {element.menu}
        </div>
      ))}
    </div>
  );
};

export default Menu;
