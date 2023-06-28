import { Link } from "react-router-dom";

const SignUpLink = () => {
  return (
    <div className="flex justify-center mt-8 min-w-max">
      <p className="mix-w-max">아직 회원이 아니신가요?</p>
      <Link to="/user/signup">
        <p className="ml-2 mix-w-max text-skyblue-1 font-medium">회원가입</p>
      </Link>
    </div>
  );
};

export default SignUpLink;
