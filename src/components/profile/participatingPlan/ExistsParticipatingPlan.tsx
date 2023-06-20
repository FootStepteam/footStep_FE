import { useRecoilState, useRecoilValue } from "recoil";
import { ReactComponent as RightArrow } from "../../../assets/rightArrow.svg";
import testImage from "../../../assets/temporary/nature-6517866_1920.jpg";
import { getShareRoomList } from "../../../store/getShareRoomList";
import { Link } from "react-router-dom";
import { jwtAccessTokenState } from "../../../state/loginState";
import { getIncludeShareRoomAPI } from "../../../api/shareRoomAPI";
import { useEffect } from "react";

const ExistsParticipatingPlan = () => {
  const [shareRooms, setShareRooms] = useRecoilState(getShareRoomList);
  const plans = useRecoilValue(getShareRoomList);
  const token = useRecoilValue(jwtAccessTokenState);

  const getShareRooms = async () => {
    const result = await getIncludeShareRoomAPI(token);
    setShareRooms(result);
  };
  useEffect(() => {
    getShareRooms();
  }, []);

  return (
    <div className="w-[50rem] h-[22rem]">
      {plans.map((plan) => (
        <Link
          key={plan.shareId}
          to={`/planShareRoom/${plan.shareId}`}
          className="group flex mx-auto w-[47rem] h-[9rem] border border-gray-003 rounded-xl cursor-pointer"
        >
          <div className="w-[15rem] h-[9rem] rounded-xl">
            <img
              className="rounded-xl object-contain"
              src={plan.imageUrl || testImage} // Assuming plan object has an img property
              alt="방썸네일"
            />
          </div>
          <div className="ml-12 w-[32rem]">
            <div className="mt-4 font-bold text-2xl">{plan.shareName}</div>
            <div className="mt-1 text-lg">
              {plan.travelStartDate} ~ {plan.travelEndDate}
            </div>
            <div className="mt-6 text-[0.8rem] text-gray-002">
              여행 일정은 입장코드를 공유 받은 인원만 입장 가능합니다.
            </div>
          </div>
          <div className="flex justify-center items-center w-12 rounded-r-xl bg-blue-002 transition-all duration-100 ease-out group-hover:w-20">
            <RightArrow width={20} height={20} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExistsParticipatingPlan;
