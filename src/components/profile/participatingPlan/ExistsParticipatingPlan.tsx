import { ReactComponent as RightArrow } from '../../../assets/rightArrow.svg';
import testImage from '../../../assets/temporary/nature-6517866_1920.jpg';

const ExistsParticipatingPlan = () => {
  return (
    <>
      <div className="w-[50rem] h-[22rem]">
        <div className="group flex mx-auto w-[47rem] h-[9rem] border border-gray rounded-xl cursor-pointer">
          <div className="w-[15rem] h-[9rem] rounded-xl">
            <img
              className="rounded-xl object-contain"
              src={testImage}
              alt="방썸네일"
            />
          </div>
          <div className="ml-12 w-[32rem]">
            <div className="mt-4 font-bold text-2xl">함께 떠는 여행</div>
            <div className="mt-1 text-lg">2023/06/07 ~ 2023/06/09</div>
            <div className="mt-6 text-[0.8rem] text-[#A5A5A5]">여행 일정은 입장코드를 공유 받은 인원만 입장 가능합니다.</div>
          </div>
          <div className="flex justify-center items-center w-12 rounded-r-xl bg-skyblue-1 transition-all duration-100 ease-out group-hover:w-20">
            <RightArrow
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExistsParticipatingPlan;
