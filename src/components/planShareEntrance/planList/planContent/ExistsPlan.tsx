import { Link } from "react-router-dom";
import testImage from "../../../../assets/temporary/nature-6517866_1920.jpg";
import { ReactComponent as RightArrow } from "../../../../assets/rightArrow.svg";

const ExistsPlan = () => {
  const plans = ["1", "2", "3", "4"];

  return (
    <>
      <h1 className="text-xl font-bold">참여중인 여행 일정 계획</h1>
      <div className="mt-12 grid grid-cols-2 w-commonSection">
        {plans.map((plan) => (
          <Link
            key={plan}
            to={`/planShareRoom/${plan}`}
            className="group flex mx-auto my-4 w-[32rem] h-[10rem] border-[#DCDCDC] border rounded-xl transition-all duration-100 ease-out hover:scale-105"
          >
            <div className="w-[12rem] h-[10rem]">
              <img
                className="rounded-xl border-black border-1 object-fill"
                width={200}
                height={200}
                src={testImage}
                alt=""
              />
            </div>
            <div className="grow ml-6">
              <div className="mt-4 font-bold text-[1.3rem]">함께 떠는 여행</div>
              <div className="mt-1 text-lg">2023/06/07 ~ 2023/06/09</div>
              <div className="mt-6 text-[0.7rem] text-[#A5A5A5]">
                <p>여행 일정은 입장코드를 공유 받은 인원만</p>
                <p>입장 가능합니다.</p>
              </div>
            </div>
            <div className="flex justify-center items-center w-12 rounded-r-xl bg-skyblue-1 transition-all duration-100 ease-out group-hover:w-14">
              <RightArrow width={20} height={20} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ExistsPlan;
