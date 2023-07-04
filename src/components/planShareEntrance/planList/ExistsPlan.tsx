import { Link } from "react-router-dom";
import testImage from "../../../assets/temporary/nature-6517866_1920.jpg";
import { ReactComponent as RightArrow } from "../../../assets/rightArrow.svg";
import { getShareRoomList } from "../../../store/getShareRoomList";
import { useRecoilValue } from "recoil";
import { sendTokenEnteringShareRoom } from "../../../api/shareRoomAPI";

const ExistsPlan = () => {
  const plans = useRecoilValue(getShareRoomList);

  return (
    <>
      <h1 className="ml-16 w-[20rem] text-2xl font-bold">
        참여중인 여행 일정 계획
      </h1>
      <div className="mt-12 w-commonSection">
        {plans.map((plan) => (
          <Link
            key={plan.shareId}
            to={`/planShareRoom/${plan.shareId}`}
            className="group flex mx-auto my-4 w-[60rem] h-[15rem] border-gray-003 border rounded-xl transition-all duration-100 ease-out hover:scale-105"
            onClick={() => sendTokenEnteringShareRoom(plan.shareId)}
          >
            <div className="w-[20rem] h-[14.9rem]">
              <img
                className="h-full rounded-l-xl object-cover"
                width={320}
                height={240}
                src={testImage}
                alt=""
              />
            </div>
            <div className="grow ml-6">
              <div className="mt-10 font-bold text-3xl">{plan.shareName}</div>
              <div className="mt-4 text-2xl">
                {plan.travelStartDate} ~ {plan.travelEndDate}
              </div>
              <div className="mt-12 text-sm text-gray-002">
                <p>여행 일정은 입장코드를 공유 받은 인원만 입장 가능합니다.</p>
              </div>
            </div>
            <div className="flex justify-center items-center w-20 rounded-r-xl bg-sky-002 transition-all duration-100 ease-out group-hover:w-24">
              <RightArrow
                width={20}
                height={20}
                fill="#FFFFFF"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ExistsPlan;
