import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
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
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex">
      {menus.map((element) => (
        <div
          key={element.menu}
          onClick={() => onClickHandler(element.path)}
          className={`flex px-3 py-4 justify-center items-center text-xl rounded-sm font-semibold cursor-pointer transition-all duration-100 ${
            location.pathname === "/"
              ? "hover:bg-sky-005"
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
