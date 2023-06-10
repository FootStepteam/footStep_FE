import Logo from "./Logo";
import Menu from "./Menu";

const LeftContainer = () => {
  return (
    <section className="flex w-[32rem] h-[4rem]">
      <Logo />
      <Menu />
    </section>
  );
};

export default LeftContainer;
