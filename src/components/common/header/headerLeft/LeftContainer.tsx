import Menu from "./Menu";

const LeftContainer = () => {
  return (
    <section className="flex w-[32rem] h-[4rem]">
      <div className="mr-8 w-32 h-16 bg-blue-100">logo</div>
      <Menu />
    </section>
  );
};

export default LeftContainer;
