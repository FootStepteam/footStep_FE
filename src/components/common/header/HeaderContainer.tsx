import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LeftContainer from "./headerLeft/LeftContainer";
import RightContainer from "./headerRight/RightContainer";

const HeaderContainer = () => {
  const [path, setPath] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <header
      className={`sticky top-0 px-4 py-6 w-full ${
        path === "/" ? "bg-white border-b border-gray-003 text-black" : ""
      } transition-colors duration-150 ease-in-out z-50`}
    >
      <nav className="flex justify-between my-0 mx-auto w-[90rem] h-[4rem] ">
        <LeftContainer />
        <RightContainer />
      </nav>
    </header>
  );
};

export default HeaderContainer;
