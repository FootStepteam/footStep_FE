import { ReactComponent as RightArrow } from "../../../assets/rightArrow.svg";
import testImage from "../../../assets/temporary/nature-6517866_1920.jpg";
import { Link } from "react-router-dom";
import { useSharedRoom } from "../../../hooks/useMyShareRoom";

const ExistsParticipatingPlan = () => {
  const { plans } = useSharedRoom();

  return (
    <div className="w-[55rem] h-[40rem] border border-black-003 rounded-xl overflow-y-scroll">
      {plans.map((plan) => (
        <Link
          key={plan.shareId}
          to={`/planShareRoom/${plan.shareId}`}
          className="group flex mx-auto my-8 w-[47rem] h-[9rem] border border-gray-003 rounded-xl cursor-pointer"
        >
          <div className="w-[15rem] rounded-xl">
            <img
              className="rounded-l-xl min-h-full object-cover"
              src={plan.imageUrl || testImage}
              alt="방썸네일"
            />
          </div>
          <div className="ml-12 w-[31rem]">
            <div className="mt-4 font-bold text-2xl">{plan.shareName}</div>
            <div className="mt-1 text-lg">
              {plan.travelStartDate} ~ {plan.travelEndDate}
            </div>
            <div className="mt-6 text-[0.8rem] text-gray-002">
              여행 일정은 입장코드를 공유 받은 인원만 입장 가능합니다.
            </div>
          </div>
          <div className="flex justify-center items-center w-12 rounded-r-xl bg-blue-002 transition-all duration-100 ease-out group-hover:w-20">
            <RightArrow width={20} height={20} fill="#FFFFFF" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExistsParticipatingPlan;
