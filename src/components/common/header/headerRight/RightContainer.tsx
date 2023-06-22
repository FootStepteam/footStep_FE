import { useRecoilValue } from "recoil";
import { jwtAccessTokenState } from "../../../../state/loginState";
import AfterLogin from "./AfterLogin";
import SignInAndUp from "./SignInAndUp";

const RightContainer = () => {
  const auth = useRecoilValue(jwtAccessTokenState);

  return (
    <section className="flex justify-end items-center mr-32 w-[30rem] h-[4rem]">
      <div className="flex items-center">
        {auth === "anonymous" ? <SignInAndUp /> : <AfterLogin />}
      </div>
    </section>
  );
};

export default RightContainer;
