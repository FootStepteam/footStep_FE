import { Link, useNavigate } from "react-router-dom";
import { jwtAccessTokenState } from "../../../../state/loginState";
import { useRecoilValue } from "recoil";

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
  const auth = useRecoilValue(jwtAccessTokenState);
  const navigate = useNavigate();

  const onClickHandler = (path: string) => {
    if(auth === "anonymous" && path === "/planShareEntrance"){
      navigate("/login");
    }else{
      navigate(path);
    }
  }

  return (
    <div className="flex grow">
      {menus.map((element) => (
        <div
          key={element.menu}
          onClick={() => onClickHandler(element.path)}
          className="flex grow justify-center items-center text-[1.3rem]
           font-semibold cursor-pointer"
        >
          {element.menu}
        </div>
      ))}
    </div>
  );
};

export default Menu;
