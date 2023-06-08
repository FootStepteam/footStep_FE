import Menu from "./Menu";

const LeftContainer = () => {
  return (
    <>
      <section className="flex w-[38rem] h-[4rem]">
        <div className="w-32 h-16 bg-blue-100">logo</div>
        <Menu />
      </section>
    </>
  );
};

export default LeftContainer;
