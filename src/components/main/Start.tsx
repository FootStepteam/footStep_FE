import { useNavigate } from "react-router-dom";
import { ReactComponent as FootStep } from "../../assets/footstep.svg";
import { ReactComponent as Map } from "../../assets/map.svg";
import { ReactComponent as MapChat } from "../../assets/mapChat.svg";
import { getCookie } from "../../utils/cookie";

const Start = () => {
  const navigate = useNavigate();
  const auth = getCookie("accessToken");

  const onClickHanlder = () => {
    if (auth === "anonymous") {
      navigate("/login");
    } else {
      navigate("/planShareEntrance");
    }
  };

  return (
    <section className="relative flex w-full min-h-screen bg-gradient-to-r from-blue-002 from-10% via-sky-001 via-30% to-sky-005 to-90%">
      <div className="ml-[12rem] pt-[15rem] h-screen min-w-max">
        <h1 className="text-white text-[3rem] font-bold">
          여행 일정 계획 플랫폼
        </h1>
        <div className="flex items-center mb-20">
          <p className="text-[3rem] font-bold text-white">발자국</p>
          <FootStep className="ml-4 w-[4rem] h-[4rem]" />
        </div>
        <div
          onClick={onClickHanlder}
          role="button"
          className="px-10 py-6 w-44 hover:bg-white border border-white rounded-xl font-bold text-white hover:text-blue-002 text-2xl cursor-pointer"
        >
          시작하기
        </div>
      </div>
      <div className="flex">
        <Map className="absolute top-[18rem] right-[14rem] w-[44rem] h-[25rem] rounded-lg shadow-md z-[5]" />
        <MapChat className="absolute top-[10rem] right-[6rem] w-[44rem] h-[25rem] rounded-lg shadow-md z-[6]" />
      </div>
    </section>
  );
};

export default Start;
