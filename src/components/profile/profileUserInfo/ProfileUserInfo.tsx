import { ReactComponent as NoProfile } from '../../../assets/smile.svg';
import { Link } from 'react-router-dom';

const ProfileUserInfo = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-8 w-[30rem] h-[10rem]">
        <div>
          <NoProfile
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <section className="ml-12">
          <div className="mb-4">
            <h1 className="font-bold">닉네임</h1>
            <div className="h-8 text-xl tracking-[-0.5px]">덩두3</div>
          </div>
          <div>
            <h1 className="font-bold">내 소개</h1>
            <div>안녕하세요 저는 누구누구입니다. </div>
          </div>
        </section>
        {/* <Link
            to={'/'}
            className="my-4 px-3 py-2 border border-maincolor rounded-md text-xs text-gray-400"
            role="button"
          >
            편집
          </Link> */}
      </div>
    </>
  );
};

export default ProfileUserInfo;
