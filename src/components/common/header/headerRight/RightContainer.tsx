import SignInAndUp from './SignInAndUp';
import AfterLogin from './AfterLogin';

const RightContainer = () => {
  return (
    <>
      <section className="flex justify-end items-center w-[25rem] h-[4rem]">
        <div className="flex">
          <SignInAndUp />
          <AfterLogin />
        </div>
      </section>
    </>
  );
};

export default RightContainer;
