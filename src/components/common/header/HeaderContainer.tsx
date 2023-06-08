import LeftContainer from "./headerLeft/LeftContainer";
import RightContainer from "./headerRight/RightContainer";

const HeaderContainer = () => {
  return (
    <>
      <header className="py-6 w-full">
        <div className="flex justify-between my-0 mx-auto w-[90rem] h-[4rem]">
          <LeftContainer />
          <RightContainer />
        </div>
      </header>
    </>
  );
};

export default HeaderContainer;
