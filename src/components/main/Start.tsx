import { Link } from "react-router-dom";
import { ReactComponent as FootStep } from "../../assets/footstep.svg";
import { ReactComponent as Map } from "../../assets/map.svg";
import { ReactComponent as MapChat } from "../../assets/mapChat.svg";

const Start = () => {
  return (
    <section className="relative w-full h-[53rem] bg-gradient-to-r from-blue-002 from-10% via-sky-001 via-30% to-sky-005 to-90%">
      <div className="ml-[19rem] pt-[10rem] w-[27rem]">
        <h1 className="text-white text-[3rem] font-bold">
          여행 일정 계획 플랫폼
        </h1>
        <div className="flex items-center mb-20">
          <p className="text-[3rem] font-bold text-white">발자국</p>
          <FootStep className="ml-4 w-[4rem] h-[4rem]" />
        </div>
        <Link
          to="/planShareEntrance"
          className="px-10 py-6 hover:bg-white border border-white rounded-xl font-bold text-white hover:text-blue-002 text-2xl"
        >
          시작하기
        </Link>
      </div>
      <Map className="absolute top-[18rem] right-[25rem] w-[37rem] h-[21rem] rounded-lg shadow-xl" />
      <MapChat className="absolute top-[10rem] right-[18rem] w-[37rem] h-[21rem] rounded-lg shadow-xl" />
    </section>
  );
};

export default Start;
