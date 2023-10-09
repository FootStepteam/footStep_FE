import LeftContainer from "./headerLeft/LeftContainer";
import RightContainer from "./headerRight/RightContainer";

const HeaderContainer = () => {
  return (
    <header
      className={
        "sticky top-0 px-4 py-6 w-full bg-white border-b border-gray-003 shadow-md text-black transition-colors duration-150 ease-in-out z-50"
      }
    >
      <nav className="flex justify-between my-0 mx-auto w-[90rem] h-[4rem] ">
        <LeftContainer />
        <RightContainer />
      </nav>
    </header>
  );
};

export default HeaderContainer;
