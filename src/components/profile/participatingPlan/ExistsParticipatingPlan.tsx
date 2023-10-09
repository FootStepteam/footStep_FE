import { ReactComponent as RightArrow } from "../../../assets/rightArrow.svg";
import testImage from "../../../assets/temporary/nature-6517866_1920.jpg";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getShareRoomList } from "../../../store/getShareRoomList";

const ExistsParticipatingPlan = () => {
  const plans = useRecoilValue(getShareRoomList);

  return (
    <div className="w-full px-2 md:px-0 md:w-[58rem] h-[40rem] overflow-auto">
      {plans.shareRoomDtoList.map((plan) => (
        <Link
          key={plan.shareId}
          to={`/planShareRoom/${plan.shareId}`}
          className="group flex flex-col md:flex-row my-8 w-full md:w-[55rem] h-[20rem] md:h-[13rem] border border-gray-003 rounded-xl cursor-pointer"
        >
          <div className="w-full h-full md:w-[15rem] rounded-t-xl md:rounded-xl overflow-hidden">
            <img
              className="rounded-l-xl min-h-full object-cover"
              src={plan.imageUrl || testImage}
              alt="thumbnail"
            />
          </div>
          <div className="md:ml-12 w-full md:w-[34rem]">
            <div className="mt-8 text-center md:text-left font-bold text-3xl">
              {plan.shareName}
            </div>
            <div className="mt-3 text-center md:text-left text-[1.3rem]">
              {plan.travelStartDate} ~ {plan.travelEndDate}
            </div>
            <div className="my-4 md:mt-10 text-center md:text-left text-sm text-gray-002">
              여행 일정은 입장코드를 공유 받은 인원만 입장 가능합니다.
            </div>
          </div>
          <div className="flex justify-center items-center w-full md:w-20 py-2 md:py-0 rounded-b-xl md:rounded-r-xl md:rounded-bl-none bg-blue-002 transition-all duration-100 ease-out md:group-hover:w-24">
            <RightArrow width={20} height={20} fill="#FFFFFF" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExistsParticipatingPlan;
