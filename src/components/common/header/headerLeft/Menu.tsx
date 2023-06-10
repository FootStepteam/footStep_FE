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
  return (
    <div className="flex grow">
      {menus.map((element) => (
        <Link
          key={element.menu}
          to={element.path}
          className="flex grow justify-center items-center text-[1.3rem]
           font-semibold cursor-pointer"
        >
          {element.menu}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
