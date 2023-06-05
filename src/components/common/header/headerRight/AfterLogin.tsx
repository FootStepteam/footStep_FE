import { Link } from 'react-router-dom';
import { ReactComponent as NoProfile } from '../../../../assets/smile.svg';

const AfterLogin = () => {
  return (
    <>
      <div className="flex justify-center items-center font-semibold">
        <Link
          to={'/'}
          className="mr-5"
        >
          마이페이지
        </Link>
        <Link
          to={'/'}
          className="mr-5"
        >
          로그아웃
        </Link>
        <div className="w-16 h-16 bg-gray-300 rounded-[100%]">
          <NoProfile
            width={64}
            height={64}
          />
        </div>
      </div>
    </>
  );
};

export default AfterLogin;
