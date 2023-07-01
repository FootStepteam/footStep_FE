import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LeftContainer from "./headerLeft/LeftContainer";
import RightContainer from "./headerRight/RightContainer";

const HeaderContainer = () => {
  const [scrollY, setScrollY] = useState(0);
  const [path, setPath] = useState("/");
  const location = useLocation();

  const scrollHandler = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <header
      className={`fixed top-0 px-4 py-6 w-full ${
        path === "/"
          ? scrollY > 30
            ? "bg-white border-b border-gray-003 text-black"
            : "bg-transparent text-white"
          : "bg-white border-b border-gray-003"
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
