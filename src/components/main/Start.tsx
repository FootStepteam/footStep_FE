import { useNavigate } from "react-router-dom";
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
    <>
      <section className="grid lg:grid-cols-2 place-items-center md:h-screen h-[40rem] bg-gradient-to-r from-blue-002 from-10% via-sky-001 via-30% to-sky-005 to-90%">
        <div>
          <h1 className="text-white text-[1.8rem] sm:text-[3rem] font-bold">
            여행 일정 계획 플랫폼 <span className="block">발자국</span>
          </h1>
          <div
            onClick={onClickHanlder}
            role="button"
            className="mt-8 px-8 sm:px-10 py-5 sm:py-6 sm:w-44 w-40 hover:bg-white border border-white rounded-xl font-bold text-white hover:text-blue-002 sm:text-2xl text-xl cursor-pointer"
          >
            시작하기
          </div>
        </div>
        <div className="">
          <Map className="w-[14rem] h-[8rem] 2xl:w-[44rem] xl:w-[30rem] lg:w-[25rem] md:w-[23rem] sm:w-[15rem] 2xl:h-[25rem] xl:h-[17rem] lg:h-[14rem] md:h-[13rem] sm:h-[10rem] rounded-lg shadow-md z-[5]" />
          <MapChat className="w-[14rem] h-[8rem] 2xl:w-[44rem] xl:w-[30rem] lg:w-[25rem] md:w-[23rem] sm:w-[15rem] 2xl:h-[25rem] xl:h-[17rem] lg:h-[14rem] md:h-[13rem] sm:h-[10rem] rounded-lg shadow-md z-[6]" />
        </div>
      </section>
    </>
  );
};

export default Start;
