import SignInAndUp from "./SignInAndUp";
import AfterLogin from "./AfterLogin";
import { jwtAccessTokenState } from "../../../../state/loginState";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

const RightContainer = () => {
  const auth = useRecoilValue(jwtAccessTokenState);

  useEffect(() => {
    console.log(auth)
  })

  return (
    <section className="flex justify-end items-center mr-32 w-[30rem] h-[4rem]">
      <div className="flex items-center">
        {auth === "anonymous" ? <SignInAndUp /> : <AfterLogin />}
      </div>
    </section>
  );
};

export default RightContainer;
