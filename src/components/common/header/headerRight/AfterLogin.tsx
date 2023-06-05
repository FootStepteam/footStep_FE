import { Link } from 'react-router-dom';

const AfterLogin = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <Link
          to={'/'}
          className="mr-5"
        >
          마이페이지
        </Link>
        <Link
          to={'/'}
          className='className="mr-5"'
        >
          로그아웃
        </Link>
      </div>
    </>
  );
};

export default AfterLogin;
