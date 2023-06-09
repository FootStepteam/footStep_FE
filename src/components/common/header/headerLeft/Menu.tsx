import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [selectedMenu, setSelectedMenu] = useState("About");

  const onClickMenuHandler = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="flex grow">
      {menus.map((element) => (
        <Link
          key={element.menu}
          to={element.path}
          className={`flex grow justify-center items-center text-[1.3rem] ${
            selectedMenu === element.menu && "text-skyblue-1"
          } font-semibold cursor-pointer`}
          onClick={() => onClickMenuHandler(element.menu)}
        >
          {element.menu}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
