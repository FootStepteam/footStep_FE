import Logo from "./Logo";
import Menu from "./Menu";

const LeftContainer = () => {
  return (
    <section className="flex w-[38rem] h-[4rem]">
      <Logo />
      <Menu />
    </section>
  );
};

export default LeftContainer;
